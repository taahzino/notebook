const controlTextarea = (content) => {
  const clientHeight = content.clientHeight;
  const scrollHeight = content.scrollHeight;

  if (scrollHeight < 450) {
    content.style.height = `${scrollHeight}px`;
  }
  if (content.innerHTML.length < 700) {
    content.style.height = "250px";
  }
};

export { controlTextarea };

