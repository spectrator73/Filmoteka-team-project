import * as filmsAPI from '../api/fetchFilms';
import { genresModal } from '../modal/genresModal.js';
import { onBackDropModalClose } from '../modal/modal-close.js';
import { onBtnModalClose } from '../modal/modal-close.js';
import { onEscapeModalClose } from '../modal/modal-close.js';
import { renderModal } from '../modal/renderModalHome';

let movieId = '';

const backDrop = document.querySelector('.backdrop');
let modalContainer = document.querySelector('.modal__container');
const btnClose = document.querySelector('.js-modal-btn');

const cardEl = document.querySelector('.gallery');
cardEl.addEventListener('click', onClickCard);
const sliderEl = document.querySelector('.swiper-wrapper');
sliderEl.addEventListener('click', onClickCard);

//object from localStorage
let localStorageFilmCard = {
  id: '',
  imgFilm: '',
  original_title: '',
  vote_average: '',
  vote_count: '',
  popularity: '',
  original_title: '',
  genres: '',
  overview: '',
};

export async function onClickCard(e) {
  if (e.currentTarget === sliderEl) {
    if (e.target.className !== 'slide-poster') {
      return;
    }
  } else {
    if (
      e.target.className !== 'gallery__item' &&
      e.target.className !== 'gallery__image' &&
      e.target.className !== 'gallery__title' &&
      e.target.className !== 'gallery__genres' &&
      e.target.className !== 'gallery__date' &&
      e.target.className !== 'gallery__vote'
    ) {
      return;
    }
  }

  backDrop.classList.remove('visually-hidden');

  const id = document.querySelector('.gallery__item');
  if (e.currentTarget === sliderEl) {
    movieId = e.target.dataset.id;
  } else {
    if (e.target.className !== 'gallery__item') {
      movieId = e.target.parentElement.dataset.id;
    } else {
      movieId = e.target.dataset.id;
    }
  }

  //film on id
  const filmsData = await filmsAPI.getOneMovieDetails(movieId);
  genresModal(filmsData);

  const cardModal = renderModal(filmsData);
  modalContainer.insertAdjacentHTML('afterbegin', cardModal);

  localStorageFilmCard.id = movieId;
  localStorageFilmCard.imgFilm = `https://image.tmdb.org/t/p/original${filmsData.poster_path}`;
  localStorageFilmCard.original_title = filmsData.original_title;
  localStorageFilmCard.vote_average = filmsData.vote_average;
  localStorageFilmCard.vote_count = filmsData.vote_count;
  localStorageFilmCard.popularity = filmsData.popularity;
  localStorageFilmCard.original_title = filmsData.original_title;
  localStorageFilmCard.genres = filmsData.genres;
  localStorageFilmCard.overview = filmsData.overview;

  const btnAddToWatch = document.querySelector('.modal__btn-active');
  btnAddToWatch.addEventListener('click', onAddLibraryFilm);

  btnClose.addEventListener('click', onBtnModalClose);
  document.addEventListener('keydown', onEscapeModalClose);
  backDrop.addEventListener('click', onBackDropModalClose);
}

const libraryFilms = [];
async function onAddLibraryFilm() {
  const film = await localStorageFilmCard;
  libraryFilms.push(film);
  localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
  const savedSettings = localStorage.getItem('cardLibrary');
  const parsedSettings = JSON.parse(savedSettings);
}
