import { createOneNote } from "../../ajax_requests/createOne.js";
import { bindNote } from "../../popup.js";
import { adjustNewNote } from "./adjustNewNote.js";

const createNewNote = async (
  newTitle,
  newContent,
  titleLength,
  contentLength,
  popup,
  allNotes,
  unpinnedDiv
) => {
  let tempId = `temp_${Math.random().toString().split(".").join("")}`;
  if (window.location.pathname === "/") {
    const newNoteHTML = document.createElement("div");
    newNoteHTML.classList.add("note");
    newNoteHTML.setAttribute("data-id", tempId);
    newNoteHTML.setAttribute("data-note-isPinned", "false");
    newNoteHTML.setAttribute("data-note-isBookmarked", "false");
    newNoteHTML.innerHTML = `
            <h3 class="note__title">${
              newTitle !== "false" ? newTitle.substr(0, titleLength) : ""
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
    allNotes.unpinned.push({
      _id: tempId,
      title: newTitle,
      pinned: false,
      content: newContent,
    });
    unpinnedDiv.insertBefore(newNoteHTML, unpinnedDiv.childNodes[0]);
    bindNote(newNoteHTML);
  }
  const newNote = await createOneNote({
    title: newTitle,
    content: newContent,
  });
  if (window.location.pathname === "/") {
    adjustNewNote(tempId, newNote._id, newNote, allNotes, popup);
  } else {
    window.location.href = '/';
  }
};

export { createNewNote };

