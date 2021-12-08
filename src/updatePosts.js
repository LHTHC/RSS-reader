/* eslint-disable no-param-reassign */
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import isEmpty from 'lodash/isEmpty';
import parser from './parser';
import proxify from './utils/routes'

const updatePosts = (url, state) => {
  axios.get(proxify(url))
    .then((response) => {
      const parsedRss = parser(response.data.contents);
      const existingPosts = state.posts;
      const downloadedPosts = parsedRss.posts;
      const newPosts = differenceBy(downloadedPosts, existingPosts, 'title');
      if (!isEmpty(newPosts)) {
        state.posts = [...newPosts, ...state.posts];
      }
    });
};

export default updatePosts;
