// DOM Variables & Constants
const body = document.querySelector("body");
const popup = document.querySelector(".popup");

const activatePopup = () => {
  body.classList.add("inactive");
  popup.classList.add("active");
};

export { activatePopup };

