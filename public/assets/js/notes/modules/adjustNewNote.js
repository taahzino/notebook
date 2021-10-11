const adjustNewNote = (tempId, newId, newNote, allNotes, popup) => {
  if (popup.getAttribute("data-id") === tempId) {
    popup.setAttribute("data-id", newId);
  }
  for (let i = 0; i < allNotes.unpinned.length; i++) {
    if (allNotes.unpinned[i]._id === tempId) {
      allNotes.unpinned[i] = { ...newNote, tempId };
      break;
    }
  }
  const unpinnedNotes = document.querySelectorAll(
    ".notes__grid.unpinned__notes .note"
  );
  for (let i = 0; i < unpinnedNotes.length; i++) {
    if (unpinnedNotes[i].getAttribute("data-id") === tempId) {
      unpinnedNotes[i].setAttribute("data-id", newId);
      break;
    }
  }
};

export { adjustNewNote };

