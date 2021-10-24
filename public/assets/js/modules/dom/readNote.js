const readNote = (dataId, isPinned) => {
  // Get window variables
  const { pathname } = window.location;
  // DOM Variables and Constants
  const note__popup = document.querySelector(".note__popup");
  const titleField = note__popup.querySelector("input#title");
  const contentField = note__popup.querySelector("#content");

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

  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i]._id === dataId || notesArray[i].tempId === dataId) {
      note__popup.setAttribute("data-id", dataId);
      note__popup.setAttribute("data-note-ispinned", notesArray[i].pinned);
      titleField.value =
        notesArray[i].title !== "false" ? notesArray[i].title : "";
      contentField.innerHTML =
        notesArray[i].content !== "false" ? notesArray[i].content : "";
      if (notesArray[i].content !== "false") {
        if (contentField.scrollHeight > 300) {
          contentField.style.height = "450px";
        } else if (contentField.scrollHeight > 120) {
          contentField.style.height = "250px";
        } else {
          contentField.style.height = "120px";
        }
      } else {
        contentField.style.height = "120px";
      }
      localStorage.setItem(
        "tempTitle",
        notesArray[i].title !== "false" ? notesArray[i].title : ""
      );
      localStorage.setItem(
        "tempContent",
        notesArray[i].content !== "false" ? notesArray[i].content : ""
      );
      break;
    }
  }
};

export { readNote };

