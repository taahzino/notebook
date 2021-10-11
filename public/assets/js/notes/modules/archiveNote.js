import { archiveOneNote } from "../ajax_requests/archiveOne.js";

const archiveThisNote = async (note, isArchived, dataId) => {
  let bool = !JSON.parse(isArchived);
  note.setAttribute("data-note-isArchived", bool);
  note.remove();
  await archiveOneNote(dataId, bool);
  bool = undefined;
};

export { archiveThisNote };

