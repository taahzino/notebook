const readNote = (dataId, wheretolookup, popup, title, content) => {
  console.log(dataId, wheretolookup, popup, title, content);
  for (let i = 0; i < wheretolookup.length; i++) {
    if (wheretolookup[i]._id === dataId || wheretolookup[i].tempId) {
      console.log(wheretolookup[i]);
      popup.setAttribute("data-id", dataId);
      popup.setAttribute(
        "data-note-ispinned",
        `${JSON.parse(wheretolookup[i].pinned)}`
      );
      title.value =
        wheretolookup[i].title !== "false" ? wheretolookup[i].title : "";
      content.value =
        wheretolookup[i].content !== "false" ? wheretolookup[i].content : "";
        localStorage.setItem('tempTitle', wheretolookup[i].title !== "false" ? wheretolookup[i].title : "");
        localStorage.setItem('tempContent', wheretolookup[i].content !== "false" ? wheretolookup[i].content : "");
      break;
    }
  }
};

export { readNote };

