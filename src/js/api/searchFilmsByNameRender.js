import { getQuery } from '../pagination/filmsPagination';
import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search__form'),
};
let searchQuery = '';

if (refs.searchForm) {
  refs.searchForm.addEventListener('submit', onFilmsByNameSearch);
}

function onFilmsByNameSearch(e) {
  e.preventDefault();

  let currentSearchQuery = e.currentTarget.elements.query.value.trim();

  if (!currentSearchQuery) {
    return;
  }

  searchQuery = currentSearchQuery;
  e.target.reset();
  getQuery(searchQuery);
}

export function renderMarkup(filmsData) {
  transformDate(filmsData);
  transformGenre(filmsData, genresList);
  clearMarkup();
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}
