import * as yup from 'yup';
import i18next from 'i18next';
import watched from './view';
import resources from './locales/index';

export default () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  return i18n
    .init({
      lng: defaultLanguage,
      resources,
    })
    .then(() => {
      const state = {
        lng: defaultLanguage,
        feeds: [],
        feedback: null,
        process: {
          validationState: null,
        },
      };

      const watchedState = watched(state, i18n);
      const schema = yup.string().url();
      const form = document.querySelector('.rss-form');

      const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        schema.validate(url)
          .then((data) => {
            if (!watchedState.feeds.includes(url)) {
              watchedState.feeds.unshift(data);
              watchedState.process.validationState = 'valid';
            } else {
              watchedState.process.validationState = 'duplication';
            }
          })
          .catch(() => {
            watchedState.process.validationState = 'invalid';
          });
      };

      form.addEventListener('submit', submitHandler);
    });
};
