export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    return null;
  }

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;

  const posts = Array.from(doc.querySelectorAll('item')).map((item) => {
    const post = {
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      isViewed: false,
    };
    return post;
  });

  const rssData = {
    title,
    description,
    posts,
  };
  return rssData;
};
