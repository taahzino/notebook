import { pinOneNote } from "../ajax_requests/pinOne.js";

const pinThisNote = async (note, dataId, isPinned, allNotes, pinnedDiv, unpinnedDiv, contentSection) => {
  // decide where to lookup
  const wheretolookup =
    isPinned === "true" ? allNotes.pinned : allNotes.unpinned;
  const newDestination =
    isPinned === "true" ? allNotes.unpinned : allNotes.pinned;
  // decide boolean
  let bool = isPinned === "true" ? false : true;
  // change data attribute
  note.setAttribute("data-note-isPinned", `${bool}`);
  // change the icon
  if (bool) {
    note
      .querySelector(".note__option_pin i")
      .setAttribute("class", "bx bxs-pin");
  } else {
    note
      .querySelector(".note__option_pin i")
      .setAttribute("class", "bx bx-pin");
  }

  // effect in the dom
  if (bool && allNotes.pinned.length === 0) {
    const pinnedTitle = document.createElement("p");
    pinnedTitle.setAttribute("class", "note__section_title pinned__title");
    pinnedTitle.innerText = "Pinned";
    contentSection.insertBefore(pinnedTitle, unpinnedDiv);

    const pinnedDiv = document.createElement("div");
    pinnedDiv.setAttribute("class", "notes__grid pinned__notes");
    pinnedDiv.appendChild(note);
    contentSection.insertBefore(pinnedDiv, unpinnedDiv);

    const othersTitle = document.createElement("p");
    othersTitle.setAttribute("class", "note__section_title other__title");
    othersTitle.innerText = "Others";
    contentSection.insertBefore(othersTitle, unpinnedDiv);
  }
  if (bool && allNotes.pinned.length > 0) {
    let pinnedDiv = document.querySelector(".notes__grid.pinned__notes");
    pinnedDiv.insertBefore(note, pinnedDiv.childNodes[0]);
  }
  if (!bool) {
    unpinnedDiv.insertBefore(note, unpinnedDiv.childNodes[0]);
  }
  // change from allNotes object
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId) {
      wheretolookup[i].pinned = bool;
      newDestination.push(wheretolookup[i]);
      wheretolookup.splice(i, 1);
    }
  }
  if (allNotes.pinned.length === 0) {
    contentSection.querySelector(".note__section_title.pinned__title").remove();
    contentSection.querySelector(".notes__grid.pinned__notes").remove();
    contentSection.querySelector(".note__section_title.other__title").remove();
  }
  // request to pin
  await pinOneNote(dataId, bool);
  bool = undefined;
};

export { pinThisNote };

