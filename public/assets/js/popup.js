import { createOneNote } from "./notes/createOne.js";
import { fetchAllNotes } from "./notes/fetchNotes.js";
import { fetchOneNote } from "./notes/fetchOne.js";
import { updateOneNote } from "./notes/updateOne.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");

var isReading = false;
var shouldUpdate = false;
var tempTitle;
var tempContent;

const controlTextarea = () => {
  const clientHeight = content.clientHeight;
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
  if (isReading) {
    if (popup.getAttribute('data-id').length === 24) {
      if (title.value !== tempTitle || content.value !== tempContent) {
        await updateOneNote(popup.getAttribute('data-id'), {
          title: title.value,
          content: content.value,
        });
        tempTitle = undefined;
        tempContent = undefined;
      }
    } else {
      if (title.value.length > 0 || content.value.length > 0) {
        await createOneNote({
          title: title.value,
          content: content.value,
        });
      }
    }
  }
  title.value = '';
  content.value = '';
  popup.setAttribute('data-id', '');
  body.classList.remove("inactive");
  popup.classList.remove("active");
  await fetchAllNotes();
};

const bindNote = async (note) => {
  note.addEventListener('click', async () => {
    activatePopup();
    isReading = true;
    const noteData = await fetchOneNote(note.getAttribute('data-id'));
    popup.setAttribute('data-id', noteData._id);
    title.value = noteData.title;
    content.value = noteData.content;
    tempTitle = noteData.title;
    tempContent = noteData.content;
  });
}

export {
  isReading,
  controlTextarea,
  activatePopup,
  deactivatePopup,
  bindNote,
};

