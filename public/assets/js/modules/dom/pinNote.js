import { pinOneNote } from "../../ajax_requests/pinOne.js";

const pinThisNote = async (note) => {
  // DOM Variables & Constants
  const pinnedDiv = document.querySelector(".notes__grid.pinned__notes");
  const unpinnedDiv = document.querySelector(".notes__grid.unpinned__notes");
  const contentSection = document.querySelector(".container .content");

  // GET notes from localStorage
  const ALL_NOTES = JSON.parse(localStorage.getItem("ALL_NOTES"));
  const PINNED_NOTES = JSON.parse(localStorage.getItem("PINNED_NOTES"));
  const UNPINNED_NOTES = JSON.parse(localStorage.getItem("UNPINNED_NOTES"));

  const isPinned = note.getAttribute("data-note-isPinned");
  const dataId = note.getAttribute("data-id");

  // decide boolean
  let bool = JSON.parse(isPinned) ? false : true;

  const firstArray = JSON.parse(isPinned) ? PINNED_NOTES : UNPINNED_NOTES;
  const secondArray = JSON.parse(isPinned) ? UNPINNED_NOTES : PINNED_NOTES;

  // change data attribute
  note.setAttribute("data-note-isPinned", `${bool}`);

  // change the icon
  if (bool) {
    note.querySelector(".note__option_pin").setAttribute("title", "Unpin");
    note
      .querySelector(".note__option_pin i")
      .setAttribute("class", "bx bxs-pin");
  } else {
    note.querySelector(".note__option_pin").setAttribute("title", "Pin");
    note
      .querySelector(".note__option_pin i")
      .setAttribute("class", "bx bx-pin");
  }

  // effect in the dom
  if (bool) {
    if (PINNED_NOTES && PINNED_NOTES.length === 0) {
      const pinnedTitle = document.createElement("p");
      pinnedTitle.setAttribute("class", "note__section_title pinned__title");
      pinnedTitle.innerText = "Pinned";
      contentSection.insertBefore(pinnedTitle, unpinnedDiv);

      pinnedDiv.setAttribute("class", "notes__grid pinned__notes");
      pinnedDiv.appendChild(note);
      contentSection.insertBefore(pinnedDiv, unpinnedDiv);

      const othersTitle = document.createElement("p");
      othersTitle.setAttribute("class", "note__section_title other__title");
      othersTitle.innerText = "Others";
      contentSection.insertBefore(othersTitle, unpinnedDiv);
    } else {
      pinnedDiv.insertBefore(note, pinnedDiv.childNodes[0]);
    }
  } else {
    unpinnedDiv.insertBefore(note, unpinnedDiv.childNodes[0]);
  }

  // change from allNotes object
  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i]._id === dataId) {
      firstArray[i].pinned = bool;
      secondArray.push(firstArray[i]);
      firstArray.splice(i, 1);
      break;
    }
  }

  ALL_NOTES.pinned = [...(JSON.parse(isPinned) ? firstArray : secondArray)];
  ALL_NOTES.unpinned = [...(JSON.parse(isPinned) ? secondArray : firstArray)];

  localStorage.setItem("ALL_NOTES", JSON.stringify(ALL_NOTES));
  localStorage.setItem("PINNED_NOTES", JSON.stringify(PINNED_NOTES));
  localStorage.setItem("UNPINNED_NOTES", JSON.stringify(UNPINNED_NOTES));

  if (PINNED_NOTES.length === 0) {
    contentSection.querySelector(".note__section_title.pinned__title").remove();
    contentSection.querySelector(".notes__grid.pinned__notes").remove();
    contentSection.querySelector(".note__section_title.other__title").remove();
  }
  // request to pin
  await pinOneNote(dataId, bool);
  bool = undefined;
};

export { pinThisNote };

