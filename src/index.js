import * as filmsAPI from './js/api/fetchFilms.js';
import { filmsPagination } from './js/pagination/filmsPagination.js';
import './js/api/trendingFilmRender';
import './js/api/searchFilmsByNameRender';
import './js/back-to-top-btn/back-to-top-btn';
import './js/dark-mode/dark-mode';
import './js/modal/modal';
// import { onTrendingFilmsRender } from './js/api/trendingFilmRender';
// document.addEventListener('DOMContentLoaded', onTrendingFilmsRender);
// Используем как filmsAPI.searchMovies() и прочее
// Пример
// document.querySelector('.yourSelector').addEventListener('click', () => {
//   return filmsAPI.searchMovies('batman').then(r => console.log(r));
// });
