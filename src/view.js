import { format } from 'prettier';
import renderers from './render/index';
import getFeedBackMessage from './utils/generateFeedBackMessage';

const {
  renderFeedback, renderFeeds, renderPosts,
} = renderers;

export default (state, text) => {
  const input = document.querySelector('#url-input');
  const addButton = document.querySelector('.add-btn');
  const feedback = document.querySelector('.feedback');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  const placeholder = document.querySelector('.holder');
  const lead = document.querySelector('.lead');
  const inputLabel = document.querySelector('.input-label');
  const example = document.querySelector('.example');
  switch (state.process) {
    case 'initializing':
    case 'changingLanguage':
      placeholder.textContent = text.t('templateText.placeholder');
      lead.textContent = text.t('templateText.lead');
      inputLabel.textContent = text.t('templateText.inputLabel');
      input.setAttribute('placeholder', text.t('templateText.inputLabel'));
      example.textContent = text.t('templateText.example');
      addButton.textContent = text.t('templateText.add');
      feedback.replaceChildren(getFeedBackMessage(state, text));
      if (state.feeds.length) {
        renderFeeds(feeds, text, state);
        renderPosts(posts, text, state);
      }
      break;
    case 'processingRequest':
      input.setAttribute('readonly', true);
      addButton.setAttribute('disabled', true);
      break;
    case 'waiting':
      input.removeAttribute('readonly');
      addButton.removeAttribute('disabled');
      if (state.feeds.length) {
        renderFeeds(feeds, text, state);
        renderPosts(posts, text, state);
      }
      renderFeedback(feedback, text, state);
      format.reset();
      input.value = '';
      break;
    case 'updatingPosts':
    case 'postsUpdated':
      renderPosts(posts, text, state);
      break;
    default:
      throw new Error(`Unknown application state: ${state.process}`);
  }
};
