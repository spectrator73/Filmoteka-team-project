let buttonsMarkup = [];
const dots = `<span>...</span>`;

const refs = {
  linkList: document.querySelector('.pages-list'),
};

export function renderController(pageNumber, totalPages) {
  if (pageNumber >= 7 && pageNumber <= totalPages) {
    dynamicButtonsRender(pageNumber, totalPages);
  }
  if (pageNumber < 7 || pageNumber === 1) {
    fisrtrButtonsRender(pageNumber, totalPages);
  }
  document.querySelector(`#item${pageNumber}`).classList.add('active');
}

export function fisrtrButtonsRender(pageNumber, totalPages) {
  refs.linkList.innerHTML = '';
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const renderPages = pages.map(page => addPage(page));
  buttonsMarkup = [...renderPages];
  if (totalPages > 7) {
    const filteredPages = pages
      .filter(page => page <= 7)
      .map(page => addPage(page));
    buttonsMarkup = [...filteredPages, dots, addPage(totalPages)];
  }
  refs.linkList.insertAdjacentHTML('beforeend', buttonsMarkup.join(''));
  document.querySelector(`#item${pageNumber}`).classList.add('active');
}

function dynamicButtonsRender(pageNumber, totalPages) {
  refs.linkList.innerHTML = '';
  let pages = [];
  for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
    pages.push(addPage(i));
  }
  if (pageNumber <= totalPages - 4 && totalPages !== 7) {
    pages.push(dots);
  }
  if (pageNumber === totalPages || pageNumber > totalPages-6) {
    pages = [];
    for (let i = totalPages - 6; i <= totalPages - 1; i++) {
    pages.push(addPage(i));
  }
  }
  buttonsMarkup = [addPage(1), dots, ...pages, addPage(totalPages)];
  if (totalPages === 7) {
      buttonsMarkup = [...pages, addPage(totalPages)];
  }
  refs.linkList.insertAdjacentHTML('beforeend', buttonsMarkup.join(''));
}

function addPage(page) {
  return `<li id=item${page}><a>${page}</a></li>`;
}

