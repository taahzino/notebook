import { fetchArchives } from "../ajax_requests/fetchArchives.js";
import { closePopup } from "../modules/closePopup.js";
import { common } from "../modules/common.js";
import { deactivatePopup } from "../modules/deactivatePopup.js";
import { localStorageAlert } from "../modules/localStorageAlert.js";

const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const note__popup = document.querySelector(".note__popup");
const closePopupBtn = document.querySelector(".note__option_close");

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
    note__popup,
    { createNoteLink, createNoteLinkIcon, createNoteLinkSpan },
    deactivatePopup
  );

  // fetch all notes
  const ARCHIVED_NOTES = await fetchArchives();

  // save notes to the localStorage by categories
  localStorage.setItem("ARCHIVED_NOTES", JSON.stringify(ARCHIVED_NOTES));
})();

window.addEventListener("scroll", () => {
  const searchBox = document.querySelector(".searchBoxWrapper");
  searchBox.classList.toggle("sticky", window.scrollY > 0);
});

// On window load
window.onload = common;
