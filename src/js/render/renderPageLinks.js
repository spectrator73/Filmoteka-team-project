let buttonsMarkup = [];
const dots = `<span>...</span>`;

const refs = {
  linkList: document.querySelector('.pages-list'),
};

export function renderController(pageNumber, totalPages) {
  if (pageNumber >= 4 && pageNumber <= totalPages) {
    dynamicButtonsRender(pageNumber, totalPages);
  }
  if (pageNumber < 4 || pageNumber === 1) {
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
  if (totalPages > 4) {
    const filteredPages = pages
      .filter(page => page <= 4)
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
  if (pageNumber <= totalPages - 4 && totalPages !== 4) {
    pages.push(dots);
  }
  if (pageNumber === totalPages || pageNumber > totalPages-3) {
    pages = [];
    for (let i = totalPages - 3; i <= totalPages - 1; i++) {
    pages.push(addPage(i));
  }
  }
  buttonsMarkup = [addPage(1), dots, ...pages, addPage(totalPages)];
  if (pageNumber === 4) {
    buttonsMarkup = [addPage(1), ...pages, addPage(totalPages)];
  }
  if (totalPages === 4) {
      buttonsMarkup = [...pages, addPage(totalPages)];
  }
  refs.linkList.insertAdjacentHTML('beforeend', buttonsMarkup.join(''));
}

export function hideNextBtn(refBtn, pageNumber, totalPages) {
  if (pageNumber === totalPages) {
    refBtn.classList.add('button-hidden');
  }
  if (refBtn.classList.contains('button-hidden') && pageNumber < totalPages) {
    refBtn.classList.remove('button-hidden');
  }
}

export function hidePrevBtn(refBtn, pageNumber) {
  if (pageNumber === 1) {
    refBtn.classList.add('button-hidden');
  }
  if (refBtn.classList.contains('button-hidden') && pageNumber > 1) {
    refBtn.classList.remove('button-hidden');
  }
}


function addPage(page) {
  return `<li id=item${page}><a>${page}</a></li>`;
}

