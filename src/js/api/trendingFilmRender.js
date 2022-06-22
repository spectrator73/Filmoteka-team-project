import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const refs = {
  gallery: document.querySelector('.gallery'),
};

export const onTrendingFilmsRender = filmsData => {
  console.log('on-trending');
  transformDate(filmsData);
  transformGenre(filmsData, genresList);
  clearMarkup();
  renderMarkup(filmsData);
};

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}
