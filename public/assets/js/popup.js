import { createOneNote } from "./notes/createOne.js";
import { deleteOneNote } from "./notes/deleteOne.js";
import { fetchAllNotes } from "./notes/fetchNotes.js";
import { updateOneNote } from "./notes/updateOne.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");
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
  const unpinnedNotes = document.querySelectorAll('.notes__grid.unpinned__notes .note');
  let newTitle = title.value;
  let newContent = content.value;
  title.value = '';
  content.value = '';
  if (isReading) {
    if (popup.getAttribute('data-id').length === 24) {
      if (newTitle !== tempTitle || newContent !== tempContent) {
        unpinnedNotes.forEach((un) => {
          if (un.getAttribute('data-id') === popup.getAttribute('data-id')) {
            un.querySelector('.note__title').innerText = newTitle;
            un.querySelector('.note__summery').innerText = newContent.substr(0, 180) + '...';
            unpinnedDiv.insertBefore(un, unpinnedDiv.childNodes[0]);
            return;
          }
        });
        allNotes.forEach((n) => {
          if (n._id === popup.getAttribute('data-id')) {
            n.title = newTitle;
            n.value = newContent;
            return;
          }
        });
        await updateOneNote(popup.getAttribute('data-id'), {
          title: newTitle,
          content: newContent,
        });
        tempTitle = undefined;
        tempContent = undefined;
        newTitle = undefined;
        newContent = undefined;
      }
    } else {
      if (newTitle.length > 0 || newContent.length > 0) {
        const newNoteHTML = document.createElement('div');
        newNoteHTML.classList.add('note');
        let tempId = `temp${Math.random().toString().split(".").join('')}`;
        newNoteHTML.setAttribute('data-id', tempId);
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
        unpinnedDiv.insertBefore(newNoteHTML, unpinnedDiv.childNodes[0]);
        bindNote(newNoteHTML);
        allNotes.push({
          _id: tempId,
          title: newTitle,
          content: newContent,
        });
        const newNote = await createOneNote({
          title: newTitle,
          content: newContent,
        });
        adjustNewNote(tempId, newNote._id, newNote);
      }
    }
  }
  popup.setAttribute('data-id', '');
};

const adjustNewNote = (tempId, newId, newNote) => {
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i]._id === tempId) {
      allNotes.splice(i, 1)
      allNotes.push(newNote);
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

const bindNote = async (note) => {
  note.addEventListener('click', async (e) => {
    const dataId = note.getAttribute('data-id');
    const deleteBtn = note.querySelector('.note__option_delete');
    if (e.target === deleteBtn || e.target.closest('button') === deleteBtn) {
      note.remove();
      for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i]._id === dataId) {
          allNotes.splice(i, 1);
          return;
        }
      }
      await deleteOneNote(dataId);
    } else {
      activatePopup();
      isReading = true;
      allNotes.forEach((noteData) => {
        if (noteData._id === dataId) {
          popup.setAttribute('data-id', noteData._id);
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

