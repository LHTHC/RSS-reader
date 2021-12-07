const renderFeeds = (target, text, { feeds }) => {
  const cardBorder = document.createElement('div');
  cardBorder.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = text;
  cardBody.appendChild(cardTitle);
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const { feedTitle, feedDescription } = feed;
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feedTitle;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feedDescription;
    liEl.append(...[h3, p]);
    list.appendChild(liEl);
  });
  cardBorder.append(...[cardBody, list]);
  target.append(cardBorder);
};

export default renderFeeds;
