import { activatePopup } from "./activatePopup.js";
import { archiveThisNote } from "./dom/archiveNote.js";
import { bookmarkThisNote } from "./dom/bookmarkNote.js";
import { deleteThisNote } from "./dom/deleteNote.js";
import { pinThisNote } from "./dom/pinNote.js";
import { readNote } from "./dom/readNote.js";

const bindNote = async (note) => {
  note.addEventListener("click", async (e) => {
    if (!window.global) {
      window.global = {};
    }
    window.global.selectedNote = note;

    const dataId = note.getAttribute("data-id");
    const isPinned = note.getAttribute("data-note-isPinned");
    const isBookmarked = note.getAttribute("data-note-isBookmarked");
    const isArchived = note.getAttribute("data-note-isArchived");
    const deleteBtn = note.querySelector(".note__option_delete");
    const pinBtn = note.querySelector(".note__option_pin");
    const bookmarkBtn = note.querySelector(".note__option_heart");
    const archiveBtn = note.querySelector(".note__option_archive");
    if (
      Boolean(deleteBtn) === true &&
      (e.target === deleteBtn || e.target.closest("button") === deleteBtn)
    ) {
      deleteThisNote(note, dataId, isPinned);
    } else if (
      Boolean(pinBtn) === true &&
      (e.target === pinBtn || e.target.closest("button") === pinBtn)
    ) {
      pinThisNote(note);
    } else if (
      Boolean(bookmarkBtn) === true &&
      (e.target === bookmarkBtn || e.target.closest("button") === bookmarkBtn)
    ) {
      bookmarkThisNote(note, isBookmarked, dataId);
    } else if (
      Boolean(archiveBtn) === true &&
      (e.target === archiveBtn || e.target.closest("button") === archiveBtn)
    ) {
      archiveThisNote(note, isArchived, dataId);
    } else {
      activatePopup();
      readNote(dataId, isPinned);
      if (!window.global) {
        window.global = {};
      }
      window.global.isReading = true;
    }
  });
};

export { bindNote };

