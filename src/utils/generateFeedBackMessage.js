export default (state, text) => {
  if (state.error) {
    return document.createTextNode(text.t(`feedback.${state.error}`));
  }
  if (state.feeds.length) {
    return document.createTextNode(text.t('feedback.successfulLoading'));
  }
  return document.createTextNode('');
};
