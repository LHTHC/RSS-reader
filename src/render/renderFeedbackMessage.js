const renderFeedback = (input, target, text, force = true) => {
  input.classList.toggle('is-invalid', force);
  target.classList.toggle('text-danger', force);
  if (force) {
    target.classList.toggle('text-success', false);
  } else {
    target.classList.toggle('text-success', true);
  }
  const textNode = document.createTextNode(text);
  target.replaceChildren(textNode);
};

export default renderFeedback;
