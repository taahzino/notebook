import { closePopup } from "../modules/closePopup.js";
import { common } from "../modules/common.js";
import { deactivatePopup } from "../modules/deactivatePopup.js";
import { localStorageAlert } from "../modules/localStorageAlert.js";

const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
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
    popup,
    { createNoteLink, createNoteLinkIcon, createNoteLinkSpan },
    deactivatePopup
  );
})();

// On window load
window.onload = common;

const commonEditBtns = document.querySelectorAll(".edit");

const disableEditing = (eb, input) => {
  input.setAttribute("disabled", "");
  input.classList.remove("editing");
  eb.innerText = "Edit";
};

const enableEditing = (eb, input) => {
  input.removeAttribute("disabled");
  input.classList.add("editing");
  eb.innerText = "Update";
};

commonEditBtns.forEach((eb) => {
  eb.addEventListener("click", () => {
    const id = eb.getAttribute("id").split("_")[1];
    const input = document.querySelector(`#${id}`);
    if (eb.innerText.toString().trim().toLowerCase() === "edit") {
      enableEditing(eb, input);
    } else {
      disableEditing(eb, input);
    }
  });
});
