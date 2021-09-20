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

textarea.addEventListener("input", controlTextarea);

createNoteLink.addEventListener("click", (e) => {
  e.preventDefault();
  activatePopup()
});

closePopupBtn.addEventListener("click", deactivatePopup);

const bindNote = (note) => {
  note.addEventListener('click', () => {
    activatePopup();
    isReading = true;
    textarea.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veritatis quod est, alias minima, magnam eos eum cupiditate aut nostrum in et, officia commodi natus quidem perferendis ex quas odit.';
  });
}

const allNotes = document.querySelectorAll('.note');

allNotes.forEach((eachnote) => {
  bindNote(eachnote);
});

body.onclick = (e) => {
  if (
    popup.classList.contains("active") &&
    e.target !== createNoteLink &&
    e.target !== createNoteLinkIcon &&
    e.target !== createNoteLinkSpan &&
    e.target.closest('.popup') !== popup &&
    !e.target.classList.contains('note') &&
    !e.target.closest('.note')
  ) {
    e.preventDefault();
    deactivatePopup();
  }
};

body.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase().trim() === 'escape') {
    deactivatePopup();
  }
});