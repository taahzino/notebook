import { controlTextarea } from './dom/controlArea.js';

// DOM Variables & Constants
const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const inputField = popup.querySelector("input");
const contentField = popup.querySelector("#content");

const activatePopup = () => {
  body.classList.add("inactive");
  popup.classList.add("active");
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

