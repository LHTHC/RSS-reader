import onChange from 'on-change';
import render from './render/index';

const { renderFeedback, renderFeeds, renderPosts } = render;

function watchedState(state, text) {
  return onChange(state, (path) => {
    const input = document.querySelector('#url-input');
    const feedback = document.querySelector('.feedback');
    const feeds = document.querySelector('.feeds');
    const posts = document.querySelector('.posts');

    if (state.error) {
      renderFeedback(input, feedback, text.t(`feedback.${state.error}`));
    } else {
      renderFeedback(input, feedback, text.t('feedback.successfulLoading'), false);
      input.innerHTML = '';
      input.focus();
    }

    if (path === 'feeds' && state.feeds) {
      renderFeeds(feeds, text, state.feeds);
    }

    if (path === 'posts' && state.posts) {
      renderPosts(posts, text, state.posts);
    }
  });
}

export default watchedState;
