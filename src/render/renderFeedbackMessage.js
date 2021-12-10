export default (target, text, state) => {
  if (state.error) {
    target.classList.add('is-invalid', 'text-danger');
    target.classList.toggle('text-success', false);
    const textNode = document.createTextNode(text.t(`feedback.${state.error}`));
    target.replaceChildren(textNode);
  } else {
    target.classList.remove('is-invalid', 'text-danger');
    target.classList.toggle('text-success', true);
    const textNode = document.createTextNode(text.t('feedback.successfulLoading'));
    target.replaceChildren(textNode);
  }
};
