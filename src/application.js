import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import watched from './view';
import resources from './locales/index';
import routes from './utils/routes';
import parser from './parser';

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
        posts: [],
        links: [],
        feedback: null,
        process: {
          validationState: null,
          parseError: null,
        },
      };

      const watchedState = watched(state, i18n);
      const schema = yup.string().url();
      const form = document.querySelector('.rss-form');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        schema.validate(url)
          .then((data) => {
            if (!watchedState.links.includes(url)) {
              watchedState.links.unshift(data);
              watchedState.process.validationState = 'valid';
            } else {
              watchedState.process.validationState = 'duplication';
            }
          })
          .catch(() => {
            watchedState.process.validationState = 'invalid';
          }).then(() => {
            if (watchedState.process.validationState === 'valid') {
              axios.get(routes.getRssPath(url))
                .then((response) => {
                  const data = parser(response.data.contents);
                  if (!data) {
                    throw new Error('parseError');
                  }
                  const { feed, posts } = data;
                  watchedState.feeds.unshift(feed);
                  watchedState.posts.unshift(...posts);
                })
                .catch((err) => {
                  throw err;
                });
            }
          });
      });
    });
};
