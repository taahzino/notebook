const body = document.querySelector("body");
const createNoteLink = document.querySelector(".createNoteLink");
const createNoteLinkIcon = createNoteLink.querySelector("i");
const createNoteLinkSpan = createNoteLink.querySelector("span");
const popup = document.querySelector(".popup");
const textarea = popup.querySelector("textarea");
const closePopupBtn = document.querySelector(".note__option_close");

const controlTextarea = () => {
  const clientHeight = textarea.clientHeight;
  const scrollHeight = textarea.scrollHeight;

  if (scrollHeight < 250) {
    textarea.style.height = `${scrollHeight}px`;
  }
};

textarea.addEventListener("input", controlTextarea);
createNoteLink.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.add("inactive");
  popup.classList.add("active");
});
closePopupBtn.addEventListener("click", () => {
  body.classList.remove("inactive");
  popup.classList.remove("active");
});

body.onclick = (e) => {
  if (
    popup.classList.contains("active") &&
    e.target !== createNoteLink &&
    e.target !== createNoteLinkIcon &&
    e.target !== createNoteLinkSpan &&
    e.target.closest('.popup') !== popup
  ) {
    e.preventDefault();
    body.classList.remove("inactive");
    popup.classList.remove("active");
  }
};
