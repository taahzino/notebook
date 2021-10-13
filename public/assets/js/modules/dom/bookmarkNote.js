import { bookmarkOneNote } from "../../ajax_requests/bookmarkOne.js";

const bookmarkThisNote = async (note, isBookmarked, dataId) => {
  let bool = !JSON.parse(isBookmarked);
  note.setAttribute("data-note-isBookmarked", bool);
  if (bool) {
    note.querySelector(".note__option_heart").setAttribute('title', 'Remove bookmark');
    note
      .querySelector(".note__option_heart i")
      .setAttribute("class", "bx bxs-heart-circle");
  } else {
    note.querySelector(".note__option_heart").setAttribute('title', 'Add bookmark');
    note
      .querySelector(".note__option_heart i")
      .setAttribute("class", "bx bx-heart");
  }
  await bookmarkOneNote(dataId, bool);
  bool = undefined;
};

export { bookmarkThisNote };

