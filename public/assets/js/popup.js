// Modules
import { fetchAllNotes } from "./notes/ajax_requests/fetchNotes.js";
import { archiveThisNote } from "./notes/modules/archiveNote.js";
import { bookmarkThisNote } from "./notes/modules/bookmarkNote.js";
import { createNewNote } from "./notes/modules/createNote.js";
import { deleteThisNote } from "./notes/modules/deleteNote.js";
import { pinThisNote } from "./notes/modules/pinNote.js";
import { readNote } from "./notes/modules/readNote.js";
import { updateNote } from "./notes/modules/updateNote.js";

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const title = popup.querySelector("input#title");
const content = popup.querySelector("textarea#content");
let pinnedDiv = document.querySelector(".notes__grid.pinned__notes");
let unpinnedDiv = document.querySelector(".notes__grid.unpinned__notes");
const contentSection = document.querySelector(".container .content");

const contentLength = 180;
const titleLength = 40;

var isReading = false;

if (typeof Storage !== "undefined") {
  localStorage.setItem("tempTitle", "");
  localStorage.setItem("tempContent", "");
} else {
  alert(
    "Warning: Your browser do not support localStorage. If you do not update or change the browser you may face some bugs!"
  );
}

var selectedNote;
var allNotes;

(async () => {
  allNotes = await fetchAllNotes();
})();

const activatePopup = () => {
  body.classList.add("inactive");
  popup.classList.add("active");
  isReading = true;
};

const deactivatePopup = async () => {
  const dataId = popup.getAttribute("data-id");
  const isPinned = popup.getAttribute("data-note-isPinned");

  popup.setAttribute("data-id", "");
  popup.setAttribute("data-note-isPinned", "");

  body.classList.remove("inactive");
  popup.classList.remove("active");

  const allNotesDOM = document.querySelectorAll(".note");

  let newTitle = title.value;
  let newContent = content.value;

  title.value = "";
  content.value = "";

  if (isReading) {
    if (dataId.length === 24) {
      let wheretolookup =
        isPinned === "true" ? allNotes.pinned : allNotes.unpinned;
      if (newTitle.trim() === "" && newContent.trim() === "") {
        deleteThisNote(selectedNote, allNotes);
      } else if (
        newTitle !== localStorage.getItem("tempTitle") ||
        newContent !== localStorage.getItem("tempContent")
      ) {
        updateNote(
          dataId,
          isPinned,
          newTitle,
          newContent,
          allNotesDOM,
          titleLength,
          contentLength,
          pinnedDiv,
          unpinnedDiv,
          wheretolookup
        );
      } else {
        // nothing
      }
    } else {
      if (newTitle.length > 0 || newContent.length > 0) {
        createNewNote(
          newTitle,
          newContent,
          titleLength,
          contentLength,
          popup,
          allNotes,
          unpinnedDiv
        );
      }
    }
  }
  localStorage.setItem("tempTitle", "");
  localStorage.setItem("tempContent", "");
  newTitle = undefined;
  newContent = undefined;
};

const bindNote = async (note) => {
  note.addEventListener("click", async (e) => {
    selectedNote = note;
    const dataId = note.getAttribute("data-id");
    const isPinned = note.getAttribute("data-note-isPinned");
    const isBookmarked = note.getAttribute("data-note-isBookmarked");
    const isArchived = note.getAttribute("data-note-isArchived");
    const wheretolookup =
      isPinned === "true" ? allNotes.pinned : allNotes.unpinned;
    const deleteBtn = note.querySelector(".note__option_delete");
    const pinBtn = note.querySelector(".note__option_pin");
    const bookmarkBtn = note.querySelector(".note__option_heart");
    const archiveBtn = note.querySelector(".note__option_archive");
    if (e.target === deleteBtn || e.target.closest("button") === deleteBtn) {
      deleteThisNote(note, allNotes);
    } else if (e.target === pinBtn || e.target.closest("button") === pinBtn) {
      pinThisNote(
        note,
        dataId,
        isPinned,
        allNotes,
        pinnedDiv,
        unpinnedDiv,
        contentSection
      );
    } else if (
      e.target === bookmarkBtn ||
      e.target.closest("button") === bookmarkBtn
    ) {
      bookmarkThisNote(note, isBookmarked, dataId);
    } else if (
      e.target === archiveBtn ||
      e.target.closest("button") === archiveBtn
    ) {
      archiveThisNote(note, isArchived, dataId);
    } else {
      activatePopup();
      isReading = true;
      readNote(dataId, wheretolookup, popup, title, content);
    }
  });
};

export { isReading, activatePopup, deactivatePopup, bindNote };

