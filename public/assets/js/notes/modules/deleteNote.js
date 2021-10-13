import { deleteOneNote } from "../../ajax_requests/deleteOne.js";

const deleteThisNote = async (note, allNotes) => {
  const dataId = note.getAttribute("data-id");
  const isPinned = note.getAttribute("data-note-isPinned");
  const wheretolookup =
    isPinned === "true" ? allNotes.pinned : allNotes.unpinned;
  note.remove();
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId) {
      wheretolookup.splice(i, 1);
      break;
    }
  }
  await deleteOneNote(dataId);
};

export { deleteThisNote };

