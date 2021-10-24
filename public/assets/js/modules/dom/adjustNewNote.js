const note__popup = document.querySelector(".note__popup");

const adjustNewNote = (tempId, newId, newNote) => {
  // DOM Variables & Constants
  const unpinnedNotes = document.querySelectorAll(
    ".notes__grid.unpinned__notes .note"
  );

  // GET localStorage datas
  const ALL_NOTES = JSON.parse(localStorage.getItem("ALL_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));

  // change popup id if the note is already opened
  if (note__popup.getAttribute("data-id") === tempId) {
    note__popup.setAttribute("data-id", newId);
  }

  for (let i = 0; i < UNPINNED_NOTES.length; i++) {
    if (UNPINNED_NOTES[i]._id === tempId) {
      UNPINNED_NOTES[i] = { ...newNote, tempId };
      break;
    }
  }
  for (let i = 0; i < ALL_NOTES.unpinned.length; i++) {
    if (ALL_NOTES.unpinned[i]._id === tempId) {
      ALL_NOTES.unpinned[i] = { ...newNote, tempId };
      break;
    }
  }
  for (let i = 0; i < unpinnedNotes.length; i++) {
    if (unpinnedNotes[i].getAttribute("data-id") === tempId) {
      unpinnedNotes[i].setAttribute("data-id", newId);
      break;
    }
  }

  localStorage.setItem('ALL_NOTES', JSON.stringify(ALL_NOTES))
  localStorage.setItem('UNPINNED_NOTES', JSON.stringify(UNPINNED_NOTES))
};

export { adjustNewNote };

