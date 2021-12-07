export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    return null;
  }
  const feedId = doc.querySelector('link').textContent.trim();
  const feedTitle = doc.querySelector('title').textContent.trim();
  const feedDescription = doc.querySelector('description').textContent.trim();
  const feed = { feedId, feedTitle, feedDescription };
  const posts = [];
  const items = Array.from(doc.querySelectorAll('item'));
  items.forEach((item) => {
    const idByFeedId = feedId;
    const postId = item.querySelector('guid').textContent.trim();
    const postLink = item.querySelector('link').textContent.trim();
    const postTitle = item.querySelector('title').textContent.trim();
    const postDescription = item.querySelector('description').textContent.trim();
    posts.push({
      idByFeedId, postId, postLink, postTitle, postDescription,
    });
  });
  return { feed, posts };
};
