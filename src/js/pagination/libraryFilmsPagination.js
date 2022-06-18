import {
  renderController,
  fisrtrButtonsRender,
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
};

refs.btnList.addEventListener('click', categoryRender);
refs.linkList.addEventListener('click', pageController);
refs.btnNext.addEventListener('click', pageIncrement);
refs.btnPrev.addEventListener('click', pageDecrement);

const watchedFilms = localStorage.getItem('watchedFilms');
const parsedWatchedFilms = JSON.parse(watchedFilms);

let pageNumber = 1;
let totalPages = 0;
let data = null;
let filteredData = [];

firstRender(parsedWatchedFilms);

function firstRender(filmsData) {
  filteredData = [];
  if (filmsData.length > 20) {
    for (let i = 0; i < 20; i++) {
      filteredData.push(filmsData[i]);
    }
    console.log(filteredData);
    libraryFilmsRender(filteredData);
    totalPagesCalculator(filmsData);
    hidePrevBtn(refs.btnPrev, pageNumber);
    hideNextBtn(refs.btnNext, pageNumber, totalPages);
    data = filmsData;
    return;
  }
  libraryFilmsRender(filmsData);
  totalPagesCalculator(filmsData);
  hidePrevBtn(refs.btnPrev, pageNumber);
  hideNextBtn(refs.btnNext, pageNumber, totalPages);
  data = filmsData;
}

function categoryRender(e) {
  if (e.target.dataset.category === 'watched') {
    const watchedFilms = localStorage.getItem('watchedFilms');
    const parsedWatchedFilms = JSON.parse(watchedFilms);
    data = parsedWatchedFilms;
    firstRender(data);
  } else {
    const queueFilms = localStorage.getItem('queueFilms');
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
  fisrtrButtonsRender(pageNumber, totalPages);
}

function filmsPagination() {
  filteredData = [];
  if (pageNumber === 1) {
    for (let i = 0; i < 20; i++) {
      filteredData.push(data[i]);
    }
    window.scrollTo(0, 0);
    libraryFilmsRender(filteredData);
  }
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
  filmsPagination();
}

function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
  filmsPagination();
}

function pageDecrement() {
  if (pageNumber === 1) {
    return;
  }
  pageNumber -= 1;
  filmsPagination();
}
