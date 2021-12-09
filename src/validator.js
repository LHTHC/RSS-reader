import * as yup from 'yup';

export default (url, loadedUrls) => {
  const schema = yup
    .string('')
    .required('emptyUrl')
    .url('invalidRssUrlError')
    .notOneOf(loadedUrls, 'duplicationUrlError');

  schema.validateSync(url);
};
