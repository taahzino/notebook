const readNote = (dataId, isPinned) => {
  // Get window variables
  const { pathname } = window.location;
  // DOM Variables and Constants
  const popup = document.querySelector(".popup");
  const titleField = popup.querySelector("input#title");
  const contentField = popup.querySelector("#content");

  const PINNED_NOTES = JSON.parse(localStorage.getItem("PINNED_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));
  
  let notesArray;
  if (pathname === '/') {
    notesArray = JSON.parse(isPinned) ? PINNED_NOTES : UNPINNED_NOTES;
  } else if (pathname === '/bookmarks') {
    const BOOKMARKED_NOTES = JSON.parse(localStorage.getItem("BOOKMARKED_NOTES"));
    notesArray = BOOKMARKED_NOTES;
  } else if (pathname === '/archives') {
    const ARCHIVED_NOTES = JSON.parse(localStorage.getItem("ARCHIVED_NOTES"));
    notesArray = ARCHIVED_NOTES;
  } else {
    notesArray = UNPINNED_NOTES;
  }

  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i]._id === dataId || notesArray[i].tempId) {
      popup.setAttribute("data-id", dataId);
      popup.setAttribute("data-note-ispinned", notesArray[i].pinned);
      titleField.value =
        notesArray[i].title !== "false" ? notesArray[i].title : "";
      if (notesArray[i].content !== "false" && notesArray[i].content.length > 700) {
        contentField.style.height = '450px';
      } else {
        contentField.style.height = '250px';
      }
      contentField.innerHTML =
        notesArray[i].content !== "false" ? notesArray[i].content : "";
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

