/* eslint-disable no-param-reassign */

import axios from 'axios';
import differenceBy from 'lodash/differenceBy.js';
import isEmpty from 'lodash/isEmpty.js';
import parser from './parser.js';
import proxify from './utils/routes.js';

const updatePosts = (url, state) => {
  axios.get(proxify(url))
    .then((response) => {
      state.process = 'updatingPosts';
      const parsedRss = parser(response.data.contents);
      const existingPosts = state.posts;
      const downloadedPosts = parsedRss.posts;
      const newPosts = differenceBy(downloadedPosts, existingPosts, 'title');
      if (!isEmpty(newPosts)) {
        state.posts = [...newPosts, ...state.posts];
      }
      state.process = 'postsUpdated';
    });
  setTimeout(() => {
    updatePosts(url, state);
  }, state.refreshInterval);
};

export default updatePosts;
