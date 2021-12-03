const renderSuccess = (input, target, text) => {
  input.classList.remove('is-invalid');
  target.classList.remove('text-danger');
  target.classList.add('text-success');
  const textNode = document.createTextNode(text);
  target.replaceChildren(textNode);
};

export default renderSuccess;
