import {
  renderController,
  hideNextBtn,
  hidePrevBtn,
} from '../render/renderPageLinks';
import { libraryFilmsRender } from '../render/renderLibraryFilms';
// fix;
const refs = {
  section: document.querySelector('.section'),
  btnList: document.querySelector('.library__button-wrap'),
  linkList: document.querySelector('.pages-list'),
  btnNext: document.querySelector('button[data-action="next"]'),
  btnPrev: document.querySelector('button[data-action="prev"]'),
  navList: document.querySelector('.page-navigation'),
  btnActive: document.querySelector('.button-wrap__button--active'),
};

if (document.location.pathname === '/index.html') {
  return;
}

if (document.querySelector('.header__library')) {
  refs.btnList.addEventListener('click', categoryRender);
}
refs.linkList.addEventListener('click', pageController);
refs.btnNext.addEventListener('click', pageIncrement);
refs.btnPrev.addEventListener('click', pageDecrement);

// const watchedFilms = localStorage.getItem('watchedFilms');
const watchedFilms = localStorage.getItem('watchedList');
const parsedWatchedFilms = JSON.parse(watchedFilms);

let savedPageNumber = JSON.parse(sessionStorage.getItem('libraryPageNumber'));
let pageNumber = 1;

!savedPageNumber ? (pageNumber = 1) : (pageNumber = savedPageNumber);

let totalPages = 0;
let data = null;
let filteredData = [];
let pageWatched = true;

if (pageNumber === 1) {
  firstRender(parsedWatchedFilms);
}

if (pageNumber > 1) {
  data = parsedWatchedFilms;
  totalPagesCalculator(parsedWatchedFilms);
  libraryPagination();
}

function firstRender(filmsData) {
  if (!filmsData || filmsData.length === 0) {
    if (document.location.pathname !== '/library.html') {
      refs.navList.style.display = 'flex';
    } else {
      refs.navList.style.display = 'none';
    }
    hidePrevBtn(refs.btnPrev, pageNumber);
    hideNextBtn(refs.btnNext, pageNumber, totalPages);
    libraryFilmsRender(filmsData);
    return;
  }
  filteredData = [];
  if (filmsData.length > 20) {
    refs.navList.style.display = 'flex';
    for (let i = 0; i < 20; i++) {
      filteredData.push(filmsData[i]);
    }
    libraryFilmsRender(filteredData);
    totalPagesCalculator(filmsData);
    hidePrevBtn(refs.btnPrev, pageNumber);
    hideNextBtn(refs.btnNext, pageNumber, totalPages);
    data = filmsData;
    return;
  }
  refs.navList.style.display = 'flex';
  libraryFilmsRender(filmsData);
  totalPagesCalculator(filmsData);
  hidePrevBtn(refs.btnPrev, pageNumber);
  hideNextBtn(refs.btnNext, pageNumber, totalPages);
  data = filmsData;
}

export function categoryRender(closedModal) {
  if (
    refs.btnActive.classList.contains('button-wrap__button--active') &&
    refs.btnActive.hasAttribute('data-category', 'watched')
  ) {
    pageWatched = true;
    const watchedFilms = localStorage.getItem('watchedList');
    const parsedWatchedFilms = JSON.parse(watchedFilms);
    data = parsedWatchedFilms;
    let savedPageNumber = JSON.parse(
      sessionStorage.getItem('libraryPageNumber')
    );
    let savedTotalPages = JSON.parse(
      sessionStorage.getItem('totalPagesWatched')
    );
    !savedPageNumber ? (pageNumber = 1) : (pageNumber = savedPageNumber);
    totalPagesCalculator(data, closedModal, savedTotalPages);
    libraryPagination();
  } else {
    pageWatched = false;
    const queueFilms = localStorage.getItem('queueList');
    const parsedQueueFilms = JSON.parse(queueFilms);
    data = parsedQueueFilms;
    let savedPageNumber = JSON.parse(
      sessionStorage.getItem('libraryPageQueueNumber')
    );
    let savedTotalPages = JSON.parse(sessionStorage.getItem('totalPagesQueue'));
    !savedPageNumber ? (pageNumber = 1) : (pageNumber = savedPageNumber);
    totalPagesCalculator(data, closedModal, savedTotalPages);
    libraryPagination();
  }
}

function totalPagesCalculator(dataArray, closedModal, savedTotalPages) {
  if (!dataArray || dataArray.length === 0) {
    refs.navList.style.display = 'none';
    return;
  }
  totalPages = Math.ceil(dataArray.length / 20);
  if (closedModal && savedTotalPages > totalPages) {
    totalPages = savedTotalPages;
    return;
  }
  renderController(pageNumber, totalPages);
  if ((refs.navList.style.display = 'none')) {
    refs.navList.style.display = 'flex';
  }
}

function libraryPagination() {
  filteredData = [];

  if (!data || data.length === 0) {
    libraryFilmsRender(data);
    return;
  }
  if (pageNumber === 1 && totalPages === pageNumber) {
    for (let i = 0; i < data.length; i++) {
      filteredData.push(data[i]);
    }
    libraryFilmsRender(filteredData);
  }

  if (pageNumber >= 1 && pageNumber < totalPages) {
    const minCount = (pageNumber - 1) * 20;
    const maxCount = minCount + 20;
    for (let i = minCount; i < maxCount; i++) {
      filteredData.push(data[i]);
    }
    libraryFilmsRender(filteredData);
  }

  if (pageNumber > 1 && pageNumber <= totalPages) {
    const minCount = (pageNumber - 1) * 20;
    for (let i = minCount; i < data.length; i++) {
      filteredData.push(data[i]);
    }
    if (filteredData.length === 0) {
      pageNumber -= 1;
      totalPages -= 1;
      pageNumberStorageChecking();
      libraryPagination();
      renderController(pageNumber, totalPages);
      hideNextBtn(refs.btnNext, pageNumber, totalPages);
      hidePrevBtn(refs.btnPrev, pageNumber);
      return;
    }
    libraryFilmsRender(filteredData);
  }
  renderController(pageNumber, totalPages);
  hideNextBtn(refs.btnNext, pageNumber, totalPages);
  hidePrevBtn(refs.btnPrev, pageNumber);
  libraryFilmsRender(filteredData);
  if (filteredData.length === 0) {
    libraryFilmsRender(data);
  }
}

function pageNumberStorageChecking() {
  if (!pageWatched) {
    sessionStorage.setItem(
      'libraryPageQueueNumber',
      JSON.stringify(pageNumber)
    );
    sessionStorage.setItem('totalPagesQueue', JSON.stringify(totalPages));
  } else {
    sessionStorage.setItem('libraryPageNumber', JSON.stringify(pageNumber));
    sessionStorage.setItem('totalPagesWatched', JSON.stringify(totalPages));
  }
}

function pageController(e) {
  const btnNumber = e.target.textContent;
  pageNumber = +btnNumber;
  pageNumberStorageChecking();
  libraryPagination();
  window.scrollTo(0, 0);
}

function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
  pageNumberStorageChecking();
  libraryPagination();
  window.scrollTo(0, 0);
}

function pageDecrement() {
  if (pageNumber === 1) {
    return;
  }
  pageNumber -= 1;
  pageNumberStorageChecking();
  libraryPagination();
  window.scrollTo(0, 0);
}
