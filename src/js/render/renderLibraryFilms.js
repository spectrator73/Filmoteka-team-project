import { transformDate } from '../api/transformDate';
import { transformGenre } from '../api/transformGenre';
import genresJson from '../api/genres.json';
import galleryMarkup from '../../templates/films-card.hbs';

const genresList = genresJson['genres'];
const title = document.querySelector('h2');

const refs = {
  gallery: document.querySelector('.gallery'),
  section: document.querySelector('.section'),
  btnNext: document.querySelector('button[data-action="next"]'),
  btnPrev: document.querySelector('button[data-action="prev"]'),
};

const emptyStorageNotification =
  '<h2 class="library-title">Нет добавленых фильмов</h2>';

export const libraryFilmsRender = filmsData => {
  if (
    refs.section.firstChild.textContent === 'Нет добавленых фильмов'
  ) {
    const title = document.querySelector('h2');
    title.remove();
  }
  refs.gallery.innerHTML = '';
  if (!filmsData || filmsData.length === 0) {
    refs.section.insertAdjacentHTML('afterbegin', emptyStorageNotification);
    return;
  }
  transformDate(filmsData);
  transformGenre(filmsData, genresList);
  refs.gallery.innerHTML = '';
  renderMarkup(filmsData); // !!! Render function awaits films card
};

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}
