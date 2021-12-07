import onChange from 'on-change';
import render from './render/index';

const { renderFeedback, renderFeeds, renderPosts } = render;

function watchedState(state, text) {
  return onChange(state, (path, value) => {
    const form = document.querySelector('.rss-form');
    const input = document.querySelector('#url-input');
    const feedback = document.querySelector('.feedback');
    const button = document.querySelector('[aria-label="add"]');
    const feeds = document.querySelector('.feeds');
    const posts = document.querySelector('.posts');

    if (path === 'process.validationState') {
      if (value === 'invalid') {
        renderFeedback(input, feedback, text.t('feedback.invalidRssUrlError'));
      }
      if (value === 'duplication') {
        renderFeedback(input, feedback, text.t('feedback.duplicationUrlError'));
      }
      if (value === 'valid') {
        renderFeedback(input, feedback, text.t('feedback.successfulLoading'), false);
        input.value = '';
        input.focus();
      }
    }

    if (path === 'feeds') {
      renderFeeds(feeds, text.t('templateText.feedsListTitle'), state);
    }
    if (path === 'posts') {
      renderPosts(posts, text.t('templateText.postsListTitle'), state);
    }
  });
}

export default watchedState;
