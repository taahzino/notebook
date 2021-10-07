import { createOneNote } from "./notes/createOne.js";
import { deleteOneNote } from "./notes/deleteOne.js";
import { fetchAllNotes } from "./notes/fetchNotes.js";
import { updateOneNote } from "./notes/updateOne.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");
let pinnedDiv = document.querySelector('.notes__grid.pinned__notes');
let unpinnedDiv = document.querySelector('.notes__grid.unpinned__notes');

var isReading = false;
var tempTitle;
var tempContent;
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
      if (newTitle !== tempTitle || newContent !== tempContent) {
        allNotesDOM.forEach((note) => {
          if (note.getAttribute('data-id') === popup.getAttribute('data-id')) {
            note.querySelector('.note__title').innerText = newTitle;
            note.querySelector('.note__summery').innerText = newContent.substr(0, 180) + '...';
            if (isPinned.toString === 'true') {
              pinnedDiv.insertBefore(note, pinnedDiv.childNodes[0]);
            } else {
              unpinnedDiv.insertBefore(note, unpinnedDiv.childNodes[0]);
            }
            return;
          }
        });
        wheretolookup.forEach((note) => {
          if (note._id === popup.getAttribute('data-id')) {
            note.title = newTitle;
            note.value = newContent;
            return;
          }
        });
        await updateOneNote(popup.getAttribute('data-id'), {
          title: newTitle,
          content: newContent,
        });
      }
      if (newTitle.trim() === '' && newContent.trim() === '') {
        for (let i = 0; i < allNotesDOM.length; i++) {
          if (allNotesDOM[i].getAttribute('data-id') === popup.getAttribute('data-id')) {
            allNotesDOM[i].remove();
            break;
          }
        }
        for (let i = 0; i < wheretolookup.length; i++) {
          if (wheretolookup[i]._id === popup.getAttribute('data-id')) {
            wheretolookup[i].title = newTitle;
            wheretolookup[i].value = newContent;
            wheretolookup.splice(i, 1);
          }
        }
      }
    } else {
      if (newTitle.length > 0 || newContent.length > 0) {
        const newNoteHTML = document.createElement('div');
        newNoteHTML.classList.add('note');
        let tempId = `temp${Math.random().toString().split(".").join('')}`;
        newNoteHTML.setAttribute('data-id', tempId);
        newNoteHTML.setAttribute('data-note-isPinned', 'false');
        newNoteHTML.innerHTML = `
            <h3 class="note__title">${newTitle !== 'false' ? newTitle : ''}</h3>
            <div name="note__summery" class="note__summery">
            ${newContent !== 'false' ? newContent.substr(0, 180) : ''}...
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
      // allNotes.unpinned.splice(i, 1)
      // allNotes.unpinned.push(newNote);
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

const deleteNote = async (note) => {
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

const bindNote = async (note) => {
  note.addEventListener('click', async (e) => {
    const dataId = note.getAttribute('data-id');
    const isPinned = note.getAttribute('data-note-isPinned');
    const wheretolookup = isPinned === 'true' ? allNotes.pinned : allNotes.unpinned;
    const deleteBtn = note.querySelector('.note__option_delete');
    if (e.target === deleteBtn || e.target.closest('button') === deleteBtn) {
      deleteNote(note);
    } else {
      activatePopup();
      isReading = true;
      wheretolookup.forEach((noteData) => {
        if (noteData._id === dataId) {
          popup.setAttribute('data-id', noteData._id);
          popup.setAttribute('data-note-pinned', `${noteData.pinned.toString() === 'true' ? 'true' : 'false'}`);
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

