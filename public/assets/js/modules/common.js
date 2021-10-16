import { activatePopup } from "../modules/activatePopup.js";
import { bindNote } from "../modules/bindNotes.js";
import { deactivatePopup } from "../modules/deactivatePopup.js";

const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const popup = document.querySelector(".popup");
const deletePopupBtn = popup.querySelector(".note__option_delete");

const common = () => {
  // Create new note
  createNoteLink.addEventListener("click", (e) => {
    e.preventDefault();
    activatePopup(body, popup);
    popup.setAttribute("data-id", "");
  });

  deletePopupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.querySelector("#content").textContent = "";
    popup.querySelector("input").value = "";
    deactivatePopup();
  });

  document.querySelectorAll(".notes__grid .note").forEach((note) => {
    bindNote(note);
  });
};

export { common };

