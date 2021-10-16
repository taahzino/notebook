// Close popup functionalities
const closePopup = (closePopupBtn, body, popup, create, deactivate) => {
  // deactivate popup on click event of close button
  closePopupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deactivate();
  });

  // If user clicks outside the popup
  body.onclick = (e) => {
    if (
      popup.classList.contains("active") &&
      e.target !== create.createNoteLink &&
      e.target !== create.createNoteLinkIcon &&
      e.target !== create.createNoteLinkSpan &&
      e.target.closest(".popup") !== popup &&
      !e.target.classList.contains("note") &&
      !e.target.closest(".note") &&
      window.getSelection().toString().length === 0
    ) {
      e.preventDefault();
      deactivate();
    }
  };

  // If user presses escape button
  body.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase().trim() === "escape") {
      deactivate();
    }
  });
};

export { closePopup };

