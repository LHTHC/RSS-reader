import i18next from 'i18next';
import axios from 'axios';
import onChange from 'on-change';
import render from './view';
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
        modalPost: {
          title: null,
        },
        process: 'initializing',
      };

      const watchedState = onChange(state, (path, value) => {
        const processes = [
          'waiting',
          'processing',
          'processingRequest',
          'postsUpdated',
          'initializing'];
        if (path === 'process' && processes.includes(value)) {
          render(state, i18n);
        }
      });
      render(state, i18n);
      const form = document.querySelector('.rss-form');
      form.addEventListener('submit', (e) => {
        watchedState.process = 'processingRequest';
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        try {
          const loadedUrls = watchedState.feeds.map((item) => item.feedUrl);
          validate(url, loadedUrls);
        } catch (validationError) {
          watchedState.error = validationError.message;
          watchedState.process = 'waiting';
          return;
        }
        axios
          .get(proxify(url))
          .then((response) => response.data.contents)
          .catch(() => {
            watchedState.error = 'networkError';
            watchedState.process = 'waiting';
          })
          .then((data) => {
            const parsedRss = parser(data);
            watchedState.error = null;
            const { title, description, posts } = parsedRss;
            const newFeed = { feedUrl: url, title, description };

            watchedState.feeds = [newFeed, ...watchedState.feeds];
            watchedState.posts = [...posts, ...watchedState.posts];
            watchedState.process = 'waiting';
            setTimeout(() => {
              updatePosts(url, watchedState);
            }, state.refreshInterval);
          })
          .catch(() => {
            watchedState.error = 'parsingError';
            watchedState.process = 'waiting';
          });
      });
    });
};
