import { createOneNote } from "./notes/createOne.js";
import { deleteOneNote } from "./notes/deleteOne.js";
import { fetchAllNotes } from "./notes/fetchNotes.js";
import { pinOneNote } from "./notes/pinOne.js";
import { updateOneNote } from "./notes/updateOne.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");
let pinnedDiv = document.querySelector('.notes__grid.pinned__notes');
let unpinnedDiv = document.querySelector('.notes__grid.unpinned__notes');
const contentSection = document.querySelector('.container .content');

const contentLength = 180;
const titleLength = 40;

var isReading = false;
var tempTitle;
var tempContent;
var selectedNote;
var allNotes;

(async () => {
  allNotes = await fetchAllNotes();
})();

const controlTextarea = () => {
  // const clientHeight = content.clientHeight;
  const scrollHeight = content.scrollHeight;

  if (scrollHeight < 350) {
    content.style.height = `${scrollHeight}px`;
  }
};

const activatePopup = () => {
  body.classList.add("inactive");
  popup.classList.add("active");
  isReading = true;
};

const deactivatePopup = async () => {
  body.classList.remove("inactive");
  popup.classList.remove("active");
  const allNotesDOM = document.querySelectorAll('.note');
  let newTitle = title.value;
  let newContent = content.value;
  title.value = '';
  content.value = '';
  if (isReading) {
    if (popup.getAttribute('data-id').length === 24) {
      const isPinned = popup.getAttribute('data-note-isPinned');
      let wheretolookup = isPinned === 'true' ? allNotes.pinned : allNotes.unpinned;
      if (newTitle.trim() === '' && newContent.trim() === '') {
        deleteThisNote(selectedNote);
      } else if (newTitle !== tempTitle || newContent !== tempContent) {
        for (let i = 0; i < allNotesDOM.length; i++) {
          if (allNotesDOM[i].getAttribute('data-id') === popup.getAttribute('data-id')) {
            allNotesDOM[i].querySelector('.note__title').innerText = newTitle.substr(0, titleLength);
            allNotesDOM[i].querySelector('.note__summery').innerText = newContent.length > contentLength ?  newContent.substr(0, contentLength) + '...' : newContent;
            if (JSON.parse(isPinned) === true) {
              pinnedDiv.insertBefore(allNotesDOM[i], pinnedDiv.childNodes[0]);
            } else {
              unpinnedDiv.insertBefore(allNotesDOM[i], unpinnedDiv.childNodes[0]);
            }
          }
        }
        for (let i = 0; i < wheretolookup.length; i++) {
          if (wheretolookup[i]._id === popup.getAttribute('data-id')) {
            wheretolookup[i].title = newTitle;
            wheretolookup[i].content = newContent;
            break;
          }
        }
        await updateOneNote(popup.getAttribute('data-id'), {
          title: newTitle,
          content: newContent,
        });
      } else {
        // nothing
      }
    } else {
      if (newTitle.length > 0 || newContent.length > 0) {
        const newNoteHTML = document.createElement('div');
        newNoteHTML.classList.add('note');
        let tempId = `temp${Math.random().toString().split(".").join('')}`;
        newNoteHTML.setAttribute('data-id', tempId);
        newNoteHTML.setAttribute('data-note-isPinned', 'false');
        newNoteHTML.innerHTML = `
            <h3 class="note__title">${newTitle !== 'false' ? newTitle.substr(0, titleLength) : ''}</h3>
            <div name="note__summery" class="note__summery">
            ${newContent !== 'false' ? newContent.length > contentLength ? newContent.substr(0, contentLength) + '...' : newContent : ''}
            </div>
            <div class="note__options">
                <button class="note__option_pin">
                    <i class="bx bx-pin"></i>
                </button>
                <button class="note__option_heart">
                    <i class="bx bx-heart-circle"></i>
                </button>
                <button class="note__option_delete">
                    <i class="bx bx-trash"></i>
                </button>
            </div>
        `;
        allNotes.unpinned.push({
          _id: tempId,
          title: newTitle,
          pinned: false,
          content: newContent,
        });
        unpinnedDiv.insertBefore(newNoteHTML, unpinnedDiv.childNodes[0]);
        bindNote(newNoteHTML);
        const newNote = await createOneNote({
          title: newTitle,
          content: newContent,
        });
        adjustNewNote(tempId, newNote._id, newNote);
      }
    }
  }
  tempTitle = undefined;
  tempContent = undefined;
  newTitle = undefined;
  newContent = undefined;
  popup.setAttribute('data-id', '');
  popup.setAttribute('data-note-isPinned', '');
};

const adjustNewNote = (tempId, newId, newNote) => {
  for (let i = 0; i < allNotes.unpinned.length; i++) {
    if (allNotes.unpinned[i]._id === tempId) {
      allNotes.unpinned[i] = newNote;
      break;
    }
  }
  const unpinnedNotes = document.querySelectorAll('.notes__grid.unpinned__notes .note');
  unpinnedNotes.forEach((un) => {
    if (un.getAttribute('data-id') === tempId) {
      un.setAttribute('data-id', newId);
      return;
    }
  });
};

const deleteThisNote = async (note) => {
  const dataId = note.getAttribute('data-id');
  const isPinned = note.getAttribute('data-note-isPinned');
  const wheretolookup = isPinned === 'true' ? allNotes.pinned : allNotes.unpinned;
  note.remove();
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId) {
      wheretolookup.splice(i, 1);
      break;
    }
  }
  await deleteOneNote(dataId);
};

const pinThisNote = async (note, dataId, isPinned) => {
  // decide where to lookup
  const wheretolookup = isPinned === 'true' ? allNotes.pinned : allNotes.unpinned;
  const newDestination = isPinned === 'true' ? allNotes.unpinned : allNotes.pinned;
  // decide boolean
  let bool = isPinned === 'true' ? false : true;
  // change data attribute
  note.setAttribute('data-note-isPinned', `${bool}`);
  // change the icon
  if (bool) {
    note.querySelector('.note__option_pin i').setAttribute('class', 'bx bxs-pin');
  } else {
    note.querySelector('.note__option_pin i').setAttribute('class', 'bx bx-pin');
  }

  // effect in the dom
  if (bool && allNotes.pinned.length === 0) {
    const pinnedTitle = document.createElement('p');
    pinnedTitle.setAttribute('class', 'note__section_title pinned__title');
    pinnedTitle.innerText = 'Pinned';
    contentSection.insertBefore(pinnedTitle, unpinnedDiv);
    
    const pinnedDiv = document.createElement('div');
    pinnedDiv.setAttribute('class', 'notes__grid pinned__notes');
    pinnedDiv.appendChild(note);
    contentSection.insertBefore(pinnedDiv, unpinnedDiv);

    const othersTitle = document.createElement('p');
    othersTitle.setAttribute('class', 'note__section_title other__title');
    othersTitle.innerText = 'Others';
    contentSection.insertBefore(othersTitle, unpinnedDiv);
  }
  if (bool && allNotes.pinned.length > 0 ) {
    let pinnedDiv = document.querySelector('.notes__grid.pinned__notes');
    pinnedDiv.insertBefore(note, pinnedDiv.childNodes[0]);
  }
  if (!bool) {
    unpinnedDiv.insertBefore(note, unpinnedDiv.childNodes[0]);
  }
  // change from allNotes object
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId) {
      wheretolookup[i].pinned = bool;
      newDestination.push(wheretolookup[i]);
      wheretolookup.splice(i, 1);
    }
  }
  if (allNotes.pinned.length === 0) {
    contentSection.querySelector('.note__section_title.pinned__title').remove();
    contentSection.querySelector('.notes__grid.pinned__notes').remove();
    contentSection.querySelector('.note__section_title.other__title').remove();
  }
  // request to pin
  await pinOneNote(dataId, bool);
  bool = undefined;
};

const bindNote = async (note) => {
  note.addEventListener('click', async (e) => {
    selectedNote = note;
    const dataId = note.getAttribute('data-id');
    const isPinned = note.getAttribute('data-note-isPinned');
    const wheretolookup = isPinned === 'true' ? allNotes.pinned : allNotes.unpinned;
    const deleteBtn = note.querySelector('.note__option_delete');
    const pinBtn = note.querySelector('.note__option_pin');
    if (e.target === deleteBtn || e.target.closest('button') === deleteBtn) {
      deleteThisNote(note);
    } else if (e.target === pinBtn || e.target.closest('button') === pinBtn) {
      pinThisNote(note, dataId, isPinned);
    } else {
      activatePopup();
      isReading = true;
      wheretolookup.forEach((noteData) => {
        if (noteData._id === dataId) {
          popup.setAttribute('data-id', noteData._id);
          popup.setAttribute('data-note-ispinned', `${JSON.parse(noteData.pinned)}`);
          title.value = noteData.title !== 'false' ? noteData.title : '';
          content.value = noteData.content;
          tempTitle = noteData.title !== 'false' ? noteData.title : '';
          tempContent = noteData.content;

          return;
        }
      });
    }
  });
}

export {
  isReading,
  controlTextarea,
  activatePopup,
  deactivatePopup,
  bindNote,
};

