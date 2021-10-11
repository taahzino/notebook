import { updateOneNote } from "../ajax_requests/updateOne.js";

const updateNote = async (
  dataId,
  isPinned,
  newTitle,
  newContent,
  allNotesDOM,
  titleLength,
  contentLength,
  pinnedDiv,
  unpinnedDiv,
  wheretolookup
) => {
  for (let i = 0; i < allNotesDOM.length; i++) {
    if (allNotesDOM[i].getAttribute("data-id") === dataId) {
      allNotesDOM[i].querySelector(".note__title").innerText = newTitle.substr(
        0,
        titleLength
      );
      allNotesDOM[i].querySelector(".note__summery").innerText =
        newContent.length > contentLength
          ? newContent.substr(0, contentLength) + "..."
          : newContent;
      if (JSON.parse(isPinned) === true) {
        pinnedDiv.insertBefore(allNotesDOM[i], pinnedDiv.childNodes[0]);
      } else {
        unpinnedDiv.insertBefore(allNotesDOM[i], unpinnedDiv.childNodes[0]);
      }
    }
  }
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId) {
      wheretolookup[i].title = newTitle;
      wheretolookup[i].content = newContent;
      break;
    }
  }
  await updateOneNote(dataId, {
    title: newTitle,
    content: newContent,
  });
};

export { updateNote };

