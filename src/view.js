import onChange from 'on-change';
import render from './render/index';

const { renderError, renderSuccess } = render;

function watchedState(state, text) {
  return onChange(state, (path, value) => {
    const form = document.querySelector('.rss-form');
    const input = document.querySelector('#url-input');
    const feedback = document.querySelector('.feedback');
    const button = document.querySelector('[aria-label="add"]');

    if (path === 'process.validationState') {
      if (value === 'invalid') {
        renderError(input, feedback, text.t('feedback.invalidRssUrlError'));
      }
      if (value === 'duplication') {
        renderError(input, feedback, text.t('feedback.duplicationUrlError'));
      }
      if (value === 'valid') {
        renderSuccess(input, feedback, text.t('feedback.successfulLoading'));
        input.value = '';
        input.focus();
      }
    }
  });
}

export default watchedState;
