const renderError = (input, target, text) => {
  input.classList.add('is-invalid');
  target.classList.add('text-danger');
  target.classList.remove('text-success');
  const textNode = document.createTextNode(text);
  target.replaceChildren(textNode);
};

export default renderError;
