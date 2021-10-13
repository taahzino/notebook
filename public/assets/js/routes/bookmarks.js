import { fetchBookmarked } from "../ajax_requests/fetchBookmarked.js";
import { activatePopup } from "../modules/activatePopup.js";
import { bindNote } from "../modules/bindNotes.js";
import { closePopup } from "../modules/closePopup.js";
import { deactivatePopup } from "../modules/deactivatePopup.js";
import { localStorageAlert } from "../modules/localStorageAlert.js";

const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".note__option_close");
const deletePopupBtn = popup.querySelector(".note__option_delete");

// IIFE (Immediately invoked function expression)
(async () => {
  // set global object and its variables
  window.global = {};
  window.global.contentLength = 180;
  window.global.titleLength = 40;

  // show alert
  localStorageAlert();

  // close popup functionality
  closePopup(
    closePopupBtn,
    body,
    popup,
    { createNoteLink, createNoteLinkIcon, createNoteLinkSpan },
    deactivatePopup
  );

  // fetch all notes
  const BOOKMARKED_NOTES = await fetchBookmarked();

  // save notes to the localStorage by categories
  localStorage.setItem("BOOKMARKED_NOTES", JSON.stringify(BOOKMARKED_NOTES));
})();

// On window load
window.onload = () => {
  // Create new note
  createNoteLink.addEventListener("click", (e) => {
    e.preventDefault();
    activatePopup(body, popup);
    popup.setAttribute("data-id", "");
  });

  deletePopupBtn.addEventListener("click", () => {
    popup.querySelector("textarea").value = "";
    popup.querySelector("input").value = "";
    deactivatePopup();
  });

  document.querySelectorAll(".notes__grid .note").forEach((note) => {
    bindNote(note);
  });
};
