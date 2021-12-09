import renderers from './render/index';

const {
  renderFeedback, renderFeeds, renderPosts,
} = renderers;

export default (state, text) => {
  const input = document.querySelector('#url-input');
  const addButton = document.querySelector('.add-btn');
  const feedback = document.querySelector('.feedback');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  switch (state.process) {
    case 'loading':
      input.setAttribute('readonly');
      addButton.classList.add('disabled');
      break;
    default:
      input.removeAttribute('readonly');
      addButton.classList.remove('disabled');
      if (state.error) {
        renderFeedback(input, feedback, text.t(`feedback.${state.error}`));
      } else {
        renderFeedback(input, feedback, text.t('feedback.successfulLoading'), false);
        input.value = '';
        input.focus();
      }
      if (state.feeds.length !== 0) {
        renderFeeds(feeds, text, state);
        renderPosts(posts, text, state);
      }
  }
};
