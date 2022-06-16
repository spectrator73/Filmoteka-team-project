import * as filmsAPI from '../api/fetchFilms.js';
import {
  renderController,
  fisrtrButtonsRender,
} from '../render/renderPageLinks';
import { onTrendingFilmsRender } from '../api/trendingFilmRender';
import { renderMarkup } from '../api/searchFilmsByNameRender';

let pageNumber = 1;
let totalPages = 20;
let searchQuery = null;

if (document.location.pathname === '/index.html') {
  const refs = {
    linkList: document.querySelector('.pages-list'),
    btnNext: document.querySelector('button[data-action="next"]'),
    btnPrev: document.querySelector('button[data-action="prev"]'),
  };

  refs.linkList.addEventListener('click', filmsPagination);
  refs.btnNext.addEventListener('click', pageIncrement);
  refs.btnPrev.addEventListener('click', pageDecrement);

  getQuery();
}

export function getQuery(query) {
  if (pageNumber > 1 && searchQuery !== query) {
    pageNumber = 1;
  }
  searchQuery = query;
  if (!searchQuery) {
    fisrtrButtonsRender(1, 20);
    trendingMoviesRender();
  } else {
    getTotalPages();
  }
}

async function getTotalPages() {
  const data = await filmsAPI.searchMovies(searchQuery, pageNumber);
  const { total_pages, results } = data;
  totalPages = total_pages;
  fisrtrButtonsRender(1, totalPages);

  renderMarkup(results);
}

async function trendingMoviesRender() {
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
}

async function fetchController() {
  console.log(searchQuery);
  if (!searchQuery) {
    trendingMoviesRender();
  } else {
    try {
      const data = await filmsAPI.searchMovies(searchQuery, pageNumber);
      const { results } = data;
      renderMarkup(results);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export async function filmsPagination(e) {
  const btnNumber = e.target.textContent;
  pageNumber = +btnNumber;
  fetchController();
  renderController(pageNumber, totalPages);
}

async function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
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
  fetchController();
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}
