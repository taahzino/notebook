import { fetchAllNotes } from "./notes/fetchNotes.js";
import { fetchOneNote } from "./notes/fetchOne.js";
import { updateOneNote } from "./notes/updateOne.js";


const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");

var isReading = false;

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
};

const deactivatePopup = async () => {
  if (isReading) {
    if (popup.getAttribute('data-id').length === 24) {
      await updateOneNote(popup.getAttribute('data-id'), {
        title: title.value,
        content: content.value,
      });
    }
    title.value = '';
    content.value = '';
    popup.setAttribute('data-id', '');
  }
  title.value = '';
  content.value = '';
  body.classList.remove("inactive");
  popup.classList.remove("active");
  popup.setAttribute('data-id', '');
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
  });
}

export {
  isReading,
  controlTextarea,
  activatePopup,
  deactivatePopup,
  bindNote,
};

