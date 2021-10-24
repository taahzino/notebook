import { createNewNote } from "./dom/createNote.js";
import { deleteThisNote } from "./dom/deleteNote.js";
import { updateNote } from "./dom/updateNote.js";

const body = document.querySelector("body");
const note__popup = document.querySelector(".note__popup");
const titleField = note__popup.querySelector("input#title");
const contentField = note__popup.querySelector("#content");

const deactivatePopup = async () => {
  const dataId = note__popup.getAttribute("data-id");
  const isPinned = note__popup.getAttribute("data-note-isPinned");

  note__popup.setAttribute("data-id", "");
  note__popup.setAttribute("data-note-isPinned", "");

  body.classList.remove("inactive");
  note__popup.classList.remove("active");

  let newTitle = titleField.value;
  let newContent = contentField.innerHTML;

  titleField.value = "";
  contentField.innerHTML = "";

  if (window.global.isReading && dataId.length === 24) {
    if ((newTitle.trim() === "") && (newContent.trim() === "") || newContent.replace(/<[^>]*>/g, '').length === 0) {
      deleteThisNote(window.global.selectedNote, dataId, isPinned);
    } else if (
      newTitle !== localStorage.getItem("tempTitle") ||
      newContent !== localStorage.getItem("tempContent")
    ) {
      updateNote(dataId, isPinned, newTitle, newContent);
    }
  } else {
    if (newTitle.length > 0 || newContent.length > 0) {
      newContent = newContent.split(/\n\r?/g).join("<br>");
      createNewNote(newTitle, newContent);
    }
  }
  localStorage.setItem("tempTitle", "");
  localStorage.setItem("tempContent", "");
  newTitle = undefined;
  newContent = undefined;
};

export { deactivatePopup };

