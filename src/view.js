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
    case 'processingRequest':
      input.setAttribute('readonly', true);
      addButton.setAttribute('disabled', true);
      break;
    case 'waiting':
      input.removeAttribute('readonly');
      addButton.removeAttribute('disabled');
      if (state.error) {
        renderFeedback(input, feedback, text.t(`feedback.${state.error}`));
      } else {
        renderFeedback(input, feedback, text.t('feedback.successfulLoading'), false);
        input.value = '';
        input.focus();
      }
      if (state.feeds.length) {
        renderFeeds(feeds, text, state);
        renderPosts(posts, text, state);
      }
      break;
    case 'updatingPosts':
    case 'postsUpdated':
      renderPosts(posts, text, state);
      break;
    default:
      throw new Error(`Unknown application state: ${state.process}`);
  }
};
