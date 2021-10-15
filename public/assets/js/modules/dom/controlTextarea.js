const controlTextarea = (content) => {
  // const clientHeight = content.clientHeight;
  const scrollHeight = content.scrollHeight;

  if (scrollHeight < 450) {
    content.style.height = `${scrollHeight}px`;
  }
};

export { controlTextarea };

