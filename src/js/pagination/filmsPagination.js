import * as filmsAPI from '../api/fetchFilms.js';
import {
  renderController,
  fisrtrButtonsRender,
} from '../render/renderPageLinks';
import { onTrendingFilmsRender } from '../api/trendingFilmRender';

let pageNumber = 1;
let totalPages = 20;

const refs = {
  linkList: document.querySelector('.pages-list'),
  btnNext: document.querySelector('button[data-action="next"]'),
  btnPrev: document.querySelector('button[data-action="prev"]'),
};

refs.linkList.addEventListener('click', filmsPagination);
refs.btnNext.addEventListener('click', pageIncrement);
refs.btnPrev.addEventListener('click', pageDecrement);

//TODO Сюда будет приходить строка запроса - если пустая то грузится 20 страниц, если нет то вызывается функция searchMovies которой передается строка запроса и с response берется total_pages.

// async function getTotalPages(movie) {
//   const data = await filmsAPI.searchMovies(movie,pageNumber);
//   const { total_pages } = data;
//   totalPages = total_pages;
//   fisrtrButtonsRender(1, totalPages);
// }

// getTotalPages('bat');

// movie !== ""
//   ? getTotalPages(movie)
//   : fisrtrButtonsRender(1, 20);

fisrtrButtonsRender(1, 20);
firstCardRender();

async function firstCardRender() {
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
}

export async function filmsPagination(e) {
  const btnNumber = e.target.textContent;
  pageNumber = +btnNumber;
  // / movie !== ""
  //   ? filmsAPI.searchMovies(movie,pageNumber)
  //   : filmsAPI.fetchTrending(pageNumber);
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}

async function pageIncrement() {
  if (pageNumber === totalPages) {
    return;
  }
  pageNumber += 1;
  // / movie !== ""
  //   ? filmsAPI.searchMovies(movie,pageNumber)
  //   : filmsAPI.fetchTrending(pageNumber);
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}

async function pageDecrement() {
  if (pageNumber === 1) {
    return;
  }
  pageNumber -= 1;
  // / movie !== ""
  //   ? filmsAPI.searchMovies(movie,pageNumber)
  //   : filmsAPI.fetchTrending(pageNumber);
  const data = await filmsAPI.fetchTrending(pageNumber);
  onTrendingFilmsRender(data);
  renderController(pageNumber, totalPages);
}
