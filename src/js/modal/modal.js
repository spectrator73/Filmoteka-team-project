import * as filmsAPI from '../api/fetchFilms';
import { genresModal } from '../modal/genresModal.js';
import { onBackDropModalClose } from '../modal/modal-close.js';
import { onBtnModalClose } from '../modal/modal-close.js';
import { onEscapeModalClose } from '../modal/modal-close.js';
import { addFilmsToLocal } from '../local-storage/addDataToLocalStorage';
// import { onAddLibraryFilm } from "../modal/film-in-localStorage.js";

let movieId = '';

const cardFilmModal = {
  id: '',
  poster_path: document.querySelector('.img-film'),
  nameFilm: document.querySelector('.about__title'),
  rating: document.querySelector('.rating'),
  ratingCount: document.querySelector('.rating-all'),
  popularity: document.querySelector('.popularity'),
  originalTitle: document.querySelector('.original-title'),
  genres: document.querySelector('.genres'),
  aboutFilms: document.querySelector('.text__information'),
};

const btnList = document.querySelector('.button-modal');
const backDrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.js-modal-btn');
const cardEl = document.querySelector('.gallery');
cardEl.addEventListener('click', onClickCard);

//object from localStorage
let localStorageFilmCard = {
  id: '',
  poster_path: '',
  original_title: '',
  vote_average: '',
  vote_count: '',
  popularity: '',
  original_title: '',
  genres: '',
  overview: '',
  release_date: '',
};

console.log(localStorageFilmCard.id);

export async function onClickCard(e) {
  //click on all liElement
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

  backDrop.classList.remove('visually-hidden');

  const id = document.querySelector('.gallery__item');
  if (e.target.className !== 'gallery__item') {
    movieId = e.target.parentElement.dataset.id;
  } else {
    movieId = e.target.dataset.id;
  }

  //film on id
  const filmsData = await filmsAPI.getOneMovieDetails(movieId);
  genresModal(filmsData);

   cardFilmModal.id = movieId;
  localStorageFilmCard.id = cardFilmModal.id;
  cardFilmModal.poster_path.src = `https://image.tmdb.org/t/p/original${filmsData.poster_path}`;
  localStorageFilmCard.poster_path = cardFilmModal.poster_path.src;
  cardFilmModal.nameFilm.textContent = filmsData.original_title;
  localStorageFilmCard.original_title = cardFilmModal.nameFilm.textContent;
  cardFilmModal.rating.textContent = filmsData.vote_average;
  localStorageFilmCard.vote_average = cardFilmModal.rating.textContent;
  cardFilmModal.ratingCount.textContent = filmsData.vote_count;
  localStorageFilmCard.vote_count = cardFilmModal.ratingCount.textContent;
  cardFilmModal.popularity.textContent = filmsData.popularity;
  localStorageFilmCard.popularity = cardFilmModal.popularity.textContent;
  cardFilmModal.originalTitle.textContent = filmsData.original_title;
  localStorageFilmCard.original_title = cardFilmModal.originalTitle.textContent;
  cardFilmModal.genres.textContent = filmsData.genres;
  localStorageFilmCard.genres = cardFilmModal.genres.textContent;
  cardFilmModal.aboutFilms.textContent = filmsData.overview;
  localStorageFilmCard.overview = cardFilmModal.aboutFilms.textContent;
  localStorageFilmCard.release_date = filmsData.release_date;

  btnClose.addEventListener('click', onBtnModalClose);
  document.addEventListener('keydown', onEscapeModalClose);
  backDrop.addEventListener('click', onBackDropModalClose);
  btnList.addEventListener('click', onAddLibraryFilm);
}

async function onAddLibraryFilm(e) {
  const film = await localStorageFilmCard;
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.dataset.action === 'add-to-watched') {
    console.log(film);
    const localKey = 'watchedFilms';
    addFilmsToLocal(film, localKey);
  } else {
    const localKey = 'queueFilms';
    addFilmsToLocal(film, localKey);
  }
}
