import * as filmsAPI from './fetchFilms';
import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const refs = {
    gallery: document.querySelector('.gallery'),
}

document.addEventListener('DOMContentLoaded', onTrendingFilmsFirstLoad);

async function onTrendingFilmsFirstLoad() {
    const filmsData = await filmsAPI.fetchTrending();
    transformDate(filmsData);
    transformGenre(filmsData, genresList);
    renderMarkup(filmsData);
}

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}