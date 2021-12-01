import * as yup from 'yup';
import onChange from 'on-change';
import View from './view';

export default () => {
  const state = {
    validUrl: null,
    feeds: [],
  };

  const schema = yup.string().url().notOneOf(state.feeds);
  const view = new View();

  const watchedState = onChange(state, () => {
    if (!state.validUrl) {
      view.showInvalidInput();
      return;
    }
    view.clearInput();
    view.showInvalidInput(false);
    console.log(state);
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.validate(url)
      .then((data) => {
        watchedState.feeds.push(data);
        watchedState.validUrl = true;
      })
      .catch((error) => {
        watchedState.validUrl = false;
        throw error;
      });
  };

  view.form.addEventListener('submit', submitHandler);
};
