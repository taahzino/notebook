import {
    activatePopup, controlTextarea,
    deactivatePopup
} from "../popup.js";
import { sendRequest } from "./fetchNotes.js";


const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
const textarea = popup.querySelector("textarea");
const closePopupBtn = document.querySelector(".note__option_close");

body.onclick = (e) => {
  if (
    popup.classList.contains("active") &&
    e.target !== createNoteLink &&
    e.target !== createNoteLinkIcon &&
    e.target !== createNoteLinkSpan &&
    e.target.closest(".popup") !== popup &&
    !e.target.classList.contains("note") &&
    !e.target.closest(".note")
  ) {
    e.preventDefault();
    deactivatePopup();
  }
};

body.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase().trim() === "escape") {
    deactivatePopup();
  }
});

window.onload = () => {
  // control textarea height
  textarea.addEventListener("input", controlTextarea);
  // activate popup
  createNoteLink.addEventListener("click", (e) => {
    e.preventDefault();
    activatePopup();
  });
  // deactivate popup on click event of close button
  closePopupBtn.addEventListener("click", deactivatePopup);

  // fetch notes
  sendRequest();
};
