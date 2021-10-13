import { deleteOneNote } from "../../ajax_requests/deleteOne.js";

const deleteThisNote = async (note, dataId, isPinned) => {
  note.remove();
  const ALL_NOTES = JSON.parse(localStorage.getItem("ALL_NOTES"));
  const PINNED_NOTES = JSON.parse(localStorage.getItem("PINNED_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));
  const notesArray = JSON.parse(isPinned) ? PINNED_NOTES : UNPINNED_NOTES;
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i]._id === dataId) {
      notesArray.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < ALL_NOTES[JSON.parse(isPinned) ? 'pinned' : 'unpinned'].length; i++) {
    if (ALL_NOTES[JSON.parse(isPinned) ? 'pinned' : 'unpinned'][i]._id === dataId) {
      ALL_NOTES[JSON.parse(isPinned) ? 'pinned' : 'unpinned'].splice(i, 1);
      break;
    }
  }
  localStorage.setItem("ALL_NOTES", JSON.stringify(ALL_NOTES));
  localStorage.setItem("PINNED_NOTES", JSON.stringify(PINNED_NOTES));
  localStorage.setItem("UNPINNED_NOTES", JSON.stringify(UNPINNED_NOTES));
  await deleteOneNote(dataId);
};

export { deleteThisNote };

