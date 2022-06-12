import * as filmsAPI from './fetchFilms';
import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const refs = {
    gallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search__input'),
}
let searchQuery = "";
let pageNumber = 1;

refs.searchForm.addEventListener('submit', onFilmsByNameSearch);

async function onFilmsByNameSearch(e) {
    e.preventDefault();

    let currentSearchQuery = e.currentTarget.elements.query.value.trim();

    if (!currentSearchQuery) {
        return;
    }

    searchQuery = currentSearchQuery;
    const {results} = await filmsAPI.searchMovies(searchQuery, pageNumber);
    const filmsData = results;
    clearMarkup();
 
    transformDate(filmsData);
    transformGenre(filmsData, genresList);
    renderMarkup(filmsData);
    e.target.reset();
}

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}