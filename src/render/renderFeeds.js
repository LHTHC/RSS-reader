const renderFeeds = (target, text, feeds) => {
  const feedsList = document.querySelector('#feeds-list');
  feedsList.innerHTML = '';
  const feedsTitle = target.querySelector('h2');
  feedsTitle.textContent = text;

  feeds.forEach((feed) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.title;
    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;
    liEl.append(title, description);
    feedsList.append(liEl);
  });
};

export default renderFeeds;
