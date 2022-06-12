import * as filmsAPI from './fetchFilms';
import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const refs = {
  gallery: document.querySelector('.gallery'),
};

document.addEventListener('DOMContentLoaded', onTrendingFilmsFirstLoad);

async function onTrendingFilmsFirstLoad() {
  const filmsData = await filmsAPI.fetchTrending();
  transformDate(filmsData);
  transformGenre(filmsData, genresList);
  renderMarkup(filmsData);
}

export const onTrendingFilmsRender = filmsData => {
  transformDate(filmsData);
  transformGenre(filmsData, genresList);
  console.log('Ready TrendigFilms for cards: ', filmsData);
  refs.gallery.innerHTML = '';
  renderMarkup(filmsData); // !!! Render function awaits films card
};

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}
