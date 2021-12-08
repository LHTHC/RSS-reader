import i18next from 'i18next';
import axios from 'axios';
import watched from './view';
import resources from './locales/index';
import proxify from './utils/routes';
import parser from './parser';
import validate from './validator';
import updatePosts from './updatePosts';

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
        error: null,
        refreshInterval: 5000,
      };

      const watchedState = watched(state, i18n);
      const form = document.querySelector('.rss-form');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        try {
          const loadedUrls = watchedState.feeds.map((item) => item.feedUrl);
          validate(url, loadedUrls);
        } catch (validationError) {
          const error = validationError.errors[0];
          watchedState.error = error;
          return;
        }
        axios
          .get(proxify(url))
          .then((response) => response.data.contents)
          .catch(() => {
            watchedState.error = 'networkError';
          })
          .then((data) => {
            watchedState.error = null;
            const parsedRss = parser(data);
            const { title, description, posts } = parsedRss;
            const newFeed = { feedUrl: url, title, description };

            watchedState.feeds = [newFeed, ...watchedState.feeds];
            watchedState.posts = [...posts, ...watchedState.posts];

            setInterval(() => {
              updatePosts(url, watchedState);
            }, state.refreshInterval);
          })
          .catch((err) => {
            watchedState.error = 'parsingError';
            throw err;
          });
      });
    });
};
