/* eslint-disable no-param-reassign */

const renderPosts = (target, text, posts) => {
  const postsList = document.querySelector('#posts-list');
  postsList.innerHTML = '';
  const postsTitle = target.querySelector('h2');
  postsTitle.textContent = text.t('templateText.postsListTitle');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalReadButton = document.querySelector('.full-article');
  const modalCloseButton = document.querySelector('.modal-footer button');

  posts.forEach((post) => {
    const liEl = document.createElement('li');
    liEl.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
    const postLink = document.createElement('a');
    postLink.setAttribute('href', post.link);
    const postClass = post.isViewed ? 'fw-normal' : 'fw-bold';
    postLink.classList.add(postClass);
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.setAttribute('postId', post.link);
    postLink.textContent = post.title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-outline-primary btn-sm');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = text.t('templateText.previewBtn');

    button.addEventListener('click', () => {
      post.isViewed = true;
      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      modalReadButton.textContent = text.t('templateText.modal.followLinkBtn');
      modalReadButton.setAttribute('href', post.link);
      modalCloseButton.textContent = text.t('templateText.modal.closeBtn');
    });

    liEl.append(postLink, button);
    postsList.append(liEl);
  });
};

export default renderPosts;
