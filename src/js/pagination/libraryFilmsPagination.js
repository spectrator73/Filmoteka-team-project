import {
  renderController,
  hideNextBtn,
  hidePrevBtn,
} from '../render/renderPageLinks';
import { libraryFilmsRender } from '../render/renderLibraryFilms';

const refs = {
  section: document.querySelector('.section'),
  btnList: document.querySelector('.library__button-wrap'),
  linkList: document.querySelector('.pages-list'),
  btnNext: document.querySelector('button[data-action="next"]'),
  btnPrev: document.querySelector('button[data-action="prev"]'),
  navList: document.querySelector('.page-navigation'),
  // added by Oleh --------------------------------------------
  btnActive: document.querySelector('.button-wrap__button--active'),
  // -----------------------------------------------------------
};

// added by Oleh --------------------------------------------
if (document.querySelector('.header__library')) {
  refs.btnList.addEventListener('click', categoryRender);
}
// -----------------------------------------------------------
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

if (pageNumber === 1) {
  firstRender(parsedWatchedFilms);
}

if (pageNumber > 1) {
  data = parsedWatchedFilms;
  totalPagesCalculator(parsedWatchedFilms);
  filmsPagination();
  console.log(data);
}

function firstRender(filmsData) {
  if (!filmsData) {
    refs.navList.style.display = 'none';
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

export function categoryRender(e) {
  // if (check || e.target.dataset.category === 'watched')  // commented by Oleh ------
  if (
    refs.btnActive.classList.contains('button-wrap__button--active') && // added by Oleh ------
    refs.btnActive.hasAttribute('data-category', 'watched') // added by Oleh ------
  ) {
    // const watchedFilms = localStorage.getItem('watchedFilms');
    const watchedFilms = localStorage.getItem('watchedList');
    const parsedWatchedFilms = JSON.parse(watchedFilms);
    data = parsedWatchedFilms;
    // added by Oleh -------------
    if (!data) {
      firstRender(data);
      return;
    }
    // --------------------------
    let savedPageNumber = JSON.parse(
      sessionStorage.getItem('libraryPageNumber')
    );
    !savedPageNumber ? (pageNumber = 1) : (pageNumber = savedPageNumber);
    totalPagesCalculator(parsedWatchedFilms);
    filmsPagination();
  } else {
    pageNumber = 1;
    // sessionStorage.removeItem('libraryPageNumber');
    // const queueFilms = localStorage.getItem('queueFilms');
    const queueFilms = localStorage.getItem('queueList');
    const parsedQueueFilms = JSON.parse(queueFilms);
    data = parsedQueueFilms;
    firstRender(data);
  }
}

function totalPagesCalculator(dataArray) {
  if (dataArray === null) {
    return;
  }

  totalPages = Math.ceil(dataArray.length / 20);
  renderController(pageNumber, totalPages);
}

export function filmsPagination() {
  filteredData = [];
  // Commented by Oleh ------------------
  // if (pageNumber === 1) {
  //   for (let i = 0; i < 20; i++) {
  //     filteredData.push(data[i]);
  //   }
  //   window.scrollTo(0, 0);
  //   libraryFilmsRender(filteredData);
  // }
  // --------------------------------------
  if (pageNumber === 1 && totalPages === 1) {
    for (let i = 0; i < data.length; i++) {
      filteredData.push(data[i]);
    }
    window.scrollTo(0, 0);
    libraryFilmsRender(filteredData);
  }

  if (pageNumber > 1 && pageNumber < totalPages) {
    const minCount = (pageNumber - 1) * 20 + 1;
    const maxCount = minCount + 20;
    for (let i = minCount; i < maxCount; i++) {
      filteredData.push(data[i]);
    }
    window.scrollTo(0, 0);
    libraryFilmsRender(filteredData);
  }

  if (pageNumber > 1 && pageNumber === totalPages) {
    const minCount = (pageNumber - 1) * 20 + 1;
    for (let i = minCount; i < data.length; i++) {
      filteredData.push(data[i]);
    }
    window.scrollTo(0, 0);
    libraryFilmsRender(filteredData);
  }
  renderController(pageNumber, totalPages);
  hideNextBtn(refs.btnNext, pageNumber, totalPages);
  hidePrevBtn(refs.btnPrev, pageNumber);
}

function pageController(e) {
  const btnNumber = e.target.textContent;
  pageNumber = +btnNumber;
  sessionStorage.setItem('libraryPageNumber', JSON.stringify(pageNumber));
  filmsPagination();
}

function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
  sessionStorage.setItem('libraryPageNumber', JSON.stringify(pageNumber));
  filmsPagination();
}

function pageDecrement() {
  if (pageNumber === 1) {
    return;
  }
  pageNumber -= 1;
  sessionStorage.setItem('libraryPageNumber', JSON.stringify(pageNumber));
  filmsPagination();
}
