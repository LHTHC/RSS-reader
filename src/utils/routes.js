export default (url) => {
  return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(`${url}`)}`;
};
