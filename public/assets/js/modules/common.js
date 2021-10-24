import { activatePopup } from "../modules/activatePopup.js";
import { bindNote } from "../modules/bindNotes.js";
import { deactivatePopup } from "../modules/deactivatePopup.js";

const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const note__popup = document.querySelector(".note__popup");
const deletePopupBtn = note__popup.querySelector(".note__option_delete");

const common = () => {
  // Create new note
  createNoteLink.addEventListener("click", (e) => {
    e.preventDefault();
    activatePopup(body, note__popup);
    note__popup.setAttribute("data-id", "");
  });

  deletePopupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    note__popup.querySelector("#content").textContent = "";
    note__popup.querySelector("input").value = "";
    deactivatePopup();
  });

  document.querySelectorAll(".notes__grid .note").forEach((note) => {
    bindNote(note);
  });

  const searchBox = document.querySelector(".searchBoxWrapper");
  searchBox.classList.toggle("sticky", window.scrollY > 0);
};

export { common };

