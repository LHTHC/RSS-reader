const renderPosts = (target, text, state) => {
  const { posts } = state;
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const title = document.createElement('h2');
  title.classList.add('card-title', 'h4');
  title.textContent = text;
  cardBody.append(title);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const {
      idByFeedId, postId, postLink, postTitle,
    } = post;
    const liEl = document.createElement('li');
    liEl.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
    const link = document.createElement('a');
    link.setAttribute('href', postLink);
    link.classList.add('fw-bold');
    link.setAttribute('data-id', idByFeedId);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('postId', postId);
    link.textContent = postTitle;
    liEl.append(link);
    list.append(liEl);
  });
  card.append(cardBody, list);
  target.append(card);
};

export default renderPosts;
