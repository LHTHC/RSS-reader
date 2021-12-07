import * as yup from 'yup';

export default (url, loadedUrls) => {
  const schema = yup
    .string()
    .url('invalidRssUrlError')
    .notOneOf(loadedUrls, 'duplicationUrlError');

  schema.validateSync(url);
};
