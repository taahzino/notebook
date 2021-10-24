import { controlTextarea } from './dom/controlArea.js';

// DOM Variables & Constants
const body = document.querySelector("body");
const note__popup = document.querySelector(".note__popup");
const inputField = note__popup.querySelector("input");
const contentField = note__popup.querySelector("#content");

const activatePopup = () => {
  body.classList.add("inactive");
  note__popup.classList.add("active");
  inputField.focus();
  contentField.style.height = "120px";
  contentField.addEventListener('input', () => {
    controlTextarea(contentField);
  });
  contentField.addEventListener('paste', () => {
    controlTextarea(contentField);
  });
};

export { activatePopup };

