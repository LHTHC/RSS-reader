const renderPosts = (target, text, posts) => {
  const postsList = document.querySelector('#posts-list');
  postsList.innerHTML = '';
  const postsTitle = target.querySelector('h2');
  postsTitle.textContent = text;

  posts.forEach((post) => {
    const liEl = document.createElement('li');
    liEl.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
    const postLink = document.createElement('a');
    postLink.setAttribute('href', post.link);
    postLink.classList.add('fw-bold');
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.setAttribute('postId', post.link);
    postLink.textContent = post.title;
    liEl.append(postLink);
    postsList.append(liEl);
  });
};

export default renderPosts;
