import * as filmsAPI from '../api/fetchFilms.js';
import {
  renderController,
  hideNextBtn,
  hidePrevBtn
} from '../render/renderPageLinks';
import { onTrendingFilmsRender } from '../api/trendingFilmRender';
import { renderMarkup } from '../api/searchFilmsByNameRender';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let savedPageNumber = JSON.parse(sessionStorage.getItem('mainPageNumber'));
let pageNumber = 1;

!savedPageNumber
  ? pageNumber = 1
  : pageNumber = savedPageNumber;

let totalPages = 20;
let searchQuery = null;
let prevSearchQuery = null;

const refs = {
  linkList: document.querySelector('.pages-list'),
  btnNext: document.querySelector('button[data-action="next"]'),
  btnPrev: document.querySelector('button[data-action="prev"]'),
  navList: document.querySelector('.page-navigation'),
};

refs.linkList.addEventListener('click', filmsPagination);
refs.btnNext.addEventListener('click', pageIncrement);
refs.btnPrev.addEventListener('click', pageDecrement);

getQuery();

export function getQuery(query) {
  searchQuery = query;
  if (!searchQuery) {
    renderController(pageNumber, totalPages);
    trendingMoviesRender();
  } else {
    getTotalPages();
  }
  hidePrevBtn(refs.btnPrev, pageNumber);
}

async function getTotalPages() {
  const data = await filmsAPI.searchMovies(searchQuery, pageNumber);

  if (!data.results.length) {
    return Notify.failure('Sorry, there are no films matching your search query. Please try again.');
  }
  const { total_pages, results } = data;
  totalPages = total_pages;
  prevSearchQuery = searchQuery;
  renderController(pageNumber, totalPages);
  
  renderMarkup(results);
}

async function trendingMoviesRender() {
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
}

async function fetchController() {
  if (!searchQuery) {
    trendingMoviesRender();
  }

  else {
    try {
      const data = await filmsAPI.searchMovies(searchQuery, pageNumber);
      const { results } = data;
      if (!results.length) {
        searchQuery = prevSearchQuery;
      }
      if (!results.length && !prevSearchQuery) {
        trendingMoviesRender();
        return
      }
      if (!results.length && prevSearchQuery) {
        const data = await filmsAPI.searchMovies(prevSearchQuery, pageNumber);
        const { results } = data;
        renderMarkup(results);
        return
      }
        renderMarkup(results);
    }
    catch (error) {
    console.log(error.message);
  }
  }
  hideNextBtn(refs.btnNext, pageNumber, totalPages);
  hidePrevBtn(refs.btnPrev, pageNumber);
  window.scrollTo(0, 0);
}

export async function filmsPagination(e) {
  const btnNumber = e.target.textContent;
  pageNumber = +btnNumber;
  sessionStorage.setItem('mainPageNumber', JSON.stringify(pageNumber));
  fetchController();
  renderController(pageNumber, totalPages);
}

async function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
  sessionStorage.setItem('mainPageNumber', JSON.stringify(pageNumber));
  fetchController();
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}

async function pageDecrement() {
  if (pageNumber === 1) {
    return;
  }
  pageNumber -= 1;
  sessionStorage.setItem('mainPageNumber', JSON.stringify(pageNumber));
  fetchController();
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}
