const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
const textarea = popup.querySelector("textarea");
const closePopupBtn = document.querySelector(".note__option_close");

var isReading = false;

const controlTextarea = () => {
  const clientHeight = textarea.clientHeight;
  const scrollHeight = textarea.scrollHeight;

  if (scrollHeight < 350) {
    textarea.style.height = `${scrollHeight}px`;
  }
};

const activatePopup = () => {
  body.classList.add("inactive");
  popup.classList.add("active");
};

const deactivatePopup = () => {
  if (isReading) {
    textarea.innerText = '';
  }
  body.classList.remove("inactive");
  popup.classList.remove("active");
};

const bindNote = (note) => {
  note.addEventListener('click', () => {
    activatePopup();
    isReading = true;
    textarea.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veritatis quod est, alias minima, magnam eos eum cupiditate aut nostrum in et, officia commodi natus quidem perferendis ex quas odit.';
  });
}

export {
  isReading,
  controlTextarea,
  activatePopup,
  deactivatePopup,
  bindNote,
};

