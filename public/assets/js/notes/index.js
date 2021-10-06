import {
  activatePopup, bindNote, deactivatePopup
} from "../popup.js";

// import { fetchAllNotes } from "./fetchNotes.js";



const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".note__option_close");
const deletePopupBtn = popup.querySelector(".note__option_delete");

body.onclick = (e) => {
  if (
    popup.classList.contains("active") &&
    e.target !== createNoteLink &&
    e.target !== createNoteLinkIcon &&
    e.target !== createNoteLinkSpan &&
    e.target.closest(".popup") !== popup &&
    !e.target.classList.contains("note") &&
    !e.target.closest(".note") &&
    window.getSelection().toString().length === 0
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
  // textarea.addEventListener("input", controlTextarea);
  // activate popup
  createNoteLink.addEventListener("click", (e) => {
    e.preventDefault();
    activatePopup();
    popup.setAttribute('data-id', '');
  });
  // deactivate popup on click event of close button
  closePopupBtn.addEventListener("click", deactivatePopup);
  deletePopupBtn.addEventListener("click", () => {
    popup.querySelector('textarea').value = '';
    popup.querySelector('input').value = '';
    deactivatePopup();
  });

  document.querySelectorAll('.notes__grid .note').forEach(note => {
    bindNote(note);
  });
  // fetch notes
  // fetchAllNotes();
};
