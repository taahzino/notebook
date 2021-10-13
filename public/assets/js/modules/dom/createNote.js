import { createOneNote } from "../../ajax_requests/createOne.js";
import { bindNote } from "../bindNotes.js";
import { adjustNewNote } from "./adjustNewNote.js";

const createNewNote = async (newTitle, newContent) => {
  // GET window and global variables
  const { pathname } = window.location;
  const { contentLength } = window.global;
  const { titleLength } = window.global;

  // SET defaults
  window.global.isReading = false;
  window.global.selectedNote = undefined;

  // DOM variables and constants
  const unpinnedDiv = document.querySelector(".notes__grid.unpinned__notes");

  // GET localStorage datas
  const ALL_NOTES = JSON.parse(localStorage.getItem("ALL_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));

  let tempId = `temp_${Math.random().toString().split(".").join("")}`;
  if (pathname === "/") {
    const newNoteHTML = document.createElement("div");
    newNoteHTML.classList.add("note");
    newNoteHTML.setAttribute("data-id", tempId);
    newNoteHTML.setAttribute("data-note-isPinned", "false");
    newNoteHTML.setAttribute("data-note-isBookmarked", "false");
    newNoteHTML.setAttribute("data-note-isArchived", "false");
    newNoteHTML.innerHTML = `
            <h3 class="note__title">${
              newTitle !== "false"
                ? newTitle.length > titleLength
                  ? newTitle.substr(0, titleLength) + "..."
                  : newTitle
                : ""
            }</h3>
            <div name="note__summery" class="note__summery">
            ${
              newContent !== "false"
                ? newContent.length > contentLength
                  ? newContent.substr(0, contentLength) + "..."
                  : newContent
                : ""
            }
            </div>
            <div class="note__options">
                <button class="note__option_pin" title="Pin this note">
                    <i class="bx bx-pin"></i>
                </button>
                <button class="note__option_heart" title="Add bookmark">
                    <i class='bx bx-heart'></i>
                </button>
                <button class="note__option_archive" title="Move to archive">
                    <i class='bx bx-archive-in'></i>
                </button>
                <button class="note__option_delete" title="Delete">
                    <i class="bx bx-trash"></i>
                </button>
            </div>
        `;

    const TEMP_NOTE_OBJ = {
      _id: tempId,
      title: newTitle,
      pinned: false,
      content: newContent,
    };
    ALL_NOTES.unpinned.push(TEMP_NOTE_OBJ);
    UNPINNED_NOTES.push(TEMP_NOTE_OBJ);
    
    localStorage.setItem("ALL_NOTES", JSON.stringify(ALL_NOTES));
    localStorage.setItem("UNPINNED_NOTES", JSON.stringify(UNPINNED_NOTES));
    
    unpinnedDiv.insertBefore(newNoteHTML, unpinnedDiv.childNodes[0]);
    bindNote(newNoteHTML);
  }

  const newNote = await createOneNote({
    title: newTitle,
    content: newContent,
  });
  if (pathname === "/") {
    adjustNewNote(tempId, newNote._id, newNote);
  } else {
    window.location.href = "/";
  }
};

export { createNewNote };

