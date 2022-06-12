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
  const renderPages = [];
  for (let i = 2; i <= 7; i++) {
    renderPages.push(addPage(i));
  }
  buttonsMarkup = [addPage(1), ...renderPages, dots, addPage(totalPages)];
  refs.linkList.insertAdjacentHTML('beforeend', buttonsMarkup.join(''));
  document.querySelector(`#item${pageNumber}`).classList.add('active');
}

function dynamicButtonsRender(pageNumber, totalPages) {
  refs.linkList.innerHTML = '';
  let renderPages = [];
  for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
    renderPages.push(addPage(i));
  }
  if (pageNumber <= totalPages - 4) {
    renderPages.push(dots);
  }
  if (pageNumber === totalPages || pageNumber > totalPages-6) {
    renderPages = [];
    for (let i = totalPages - 6; i <= totalPages - 1; i++) {
    renderPages.push(addPage(i));
  }
  }
  buttonsMarkup = [addPage(1), dots, ...renderPages, addPage(totalPages)];
  refs.linkList.insertAdjacentHTML('beforeend', buttonsMarkup.join(''));
}

function addPage(page) {
  return `<li id=item${page}><a>${page}</a></li>`;
}

