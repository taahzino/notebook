import { updateOneNote } from "../../ajax_requests/updateOne.js";

const updateNote = async (dataId, isPinned, newTitle, newContent) => {
  // GET window and global variables
  const { pathname } = window.location;
  const { contentLength } = window.global;
  const { titleLength } = window.global;

  // DOM variables and constants
  const allNotesDOM = document.querySelectorAll(".note");
  const pinnedDiv = document.querySelector(".notes__grid.pinned__notes");
  const unpinnedDiv = document.querySelector(".notes__grid.unpinned__notes");

  // GET localStorage datas
  const ALL_NOTES = JSON.parse(localStorage.getItem("ALL_NOTES"));
  const PINNED_NOTES = JSON.parse(localStorage.getItem("PINNED_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));

  let notesArray;
  if (pathname === "/") {
    notesArray = JSON.parse(isPinned) ? PINNED_NOTES : UNPINNED_NOTES;
  } else if (pathname === "/bookmarks") {
    const BOOKMARKED_NOTES = JSON.parse(
      localStorage.getItem("BOOKMARKED_NOTES")
    );
    notesArray = BOOKMARKED_NOTES;
  } else if (pathname === "/archives") {
    const ARCHIVED_NOTES = JSON.parse(localStorage.getItem("ARCHIVED_NOTES"));
    notesArray = ARCHIVED_NOTES;
  } else {
    notesArray = UNPINNED_NOTES;
  }

  // DOM manipulation
  for (let i = 0; i < allNotesDOM.length; i++) {
    if (allNotesDOM[i].getAttribute("data-id") === dataId) {
      allNotesDOM[i].querySelector(".note__title").innerText = newTitle.substr(
        0,
        titleLength
      );
      allNotesDOM[i].querySelector(".note__summery").innerHTML =
        newContent.length > contentLength
          ? newContent.substr(0, contentLength) + "..."
          : newContent;
      // Check the pathname
      if (pathname === "/") {
        if (JSON.parse(isPinned) === true) {
          pinnedDiv.insertBefore(allNotesDOM[i], pinnedDiv.childNodes[0]);
        } else {
          unpinnedDiv.insertBefore(allNotesDOM[i], unpinnedDiv.childNodes[0]);
        }
      } else {
        const commonDiv = document.querySelector(".notes__grid");
        if (commonDiv.childNodes.length > 0) {
          commonDiv.insertBefore(allNotesDOM[i], commonDiv.childNodes[0]);
        } else {
          commonDiv.appendChild(allNotesDOM[i]);
        }
      }
      break;
    }
  }
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i]._id === dataId) {
      notesArray[i].title = newTitle;
      notesArray[i].content = newContent;
      break;
    }
  }

  if (pathname === "/") {
    ALL_NOTES[JSON.parse(isPinned) ? "pinned" : "unpinned"] = [...notesArray];
    localStorage.setItem("ALL_NOTES", JSON.stringify(ALL_NOTES));
    localStorage.setItem("PINNED_NOTES", JSON.stringify(PINNED_NOTES));
    localStorage.setItem("UNPINNED_NOTES", JSON.stringify(UNPINNED_NOTES));
  } else if (pathname === "/bookmarks") {
    localStorage.setItem("BOOKMARKED_NOTES", JSON.stringify(notesArray));
  } else if (pathname === "/archives") {
    localStorage.setItem("ARCHIVED_NOTES", JSON.stringify(notesArray));
  } else {
    // getlost
  }

  await updateOneNote(dataId, {
    title: newTitle,
    content: newContent,
  });
};

export { updateNote };

