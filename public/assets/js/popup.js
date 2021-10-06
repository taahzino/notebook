import { createOneNote } from "./notes/createOne.js";
import { deleteOneNote } from "./notes/deleteOne.js";
import { fetchOneNote } from "./notes/fetchOne.js";
import { updateOneNote } from "./notes/updateOne.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");
let unpinnedDiv = document.querySelector('.notes__grid.unpinned__notes');

var isReading = false;
var tempTitle;
var tempContent;

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
  if (isReading) {
    if (popup.getAttribute('data-id').length === 24) {
      if (title.value !== tempTitle || content.value !== tempContent) {
        await updateOneNote(popup.getAttribute('data-id'), {
          title: title.value,
          content: content.value,
        });
        unpinnedNotes.forEach((un) => {
          if (un.getAttribute('data-id') === popup.getAttribute('data-id')) {
            un.querySelector('.note__title').innerText = title.value;
            un.querySelector('.note__summery').innerText = content.value.substr(0, 180) + '...';
            unpinnedDiv.insertBefore(un, unpinnedDiv.childNodes[0]);
          }
        });
        tempTitle = undefined;
        tempContent = undefined;
      }
    } else {
      if (title.value.length > 0 || content.value.length > 0) {
        const newNote = await createOneNote({
          title: title.value,
          content: content.value,
        });
        const newNoteHTML = document.createElement('div');
        newNoteHTML.classList.add('note');
        newNoteHTML.setAttribute('data-id', newNote._id);
        newNoteHTML.innerHTML = `
            <h3 class="note__title">${newNote.title !== 'false' ? newNote.title : ''}</h3>
            <div name="note__summery" class="note__summery">
            ${newNote.content.substr(0, 180)}...
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
      }
    }
  }
  popup.setAttribute('data-id', '');
  title.value = '';
  content.value = '';
};

const bindNote = async (note) => {
  note.addEventListener('click', async (e) => {
    const deleteBtn = note.querySelector('.note__option_delete');
    if (e.target === deleteBtn || e.target.closest('button') === deleteBtn) {
      note.remove();
      await deleteOneNote(note.getAttribute('data-id'));
    } else {
      activatePopup();
      isReading = true;
      const noteData = await fetchOneNote(note.getAttribute('data-id'));
      popup.setAttribute('data-id', noteData._id);
      title.value = noteData.title !== 'false' ? noteData.title : '';
      content.value = noteData.content;
      tempTitle = noteData.title !== 'false' ? noteData.title : '';
      tempContent = noteData.content;
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

