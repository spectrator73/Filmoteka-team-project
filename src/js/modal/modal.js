import * as filmsAPI from '../api/fetchFilms';
import { transformGenre } from '../api/transformGenre';
import genresJson from '../api/genres.json';
import { onBackDropModalClose } from '../modal/modal-close.js';
import { onBtnModalClose } from '../modal/modal-close.js';
import { onEscapeModalClose } from '../modal/modal-close.js';

let searchName = '';
const genresList = genresJson['genres'];

const cardFilModal = {
  imgFilm: document.querySelector('.img-film'),
  nameFilm: document.querySelector('.about__title'),
  rating: document.querySelector('.rating'),
  ratingCount: document.querySelector('.rating-all'),
  popularity: document.querySelector('.popularity'),
  originalTitle: document.querySelector('.original-title'),
  genres: document.querySelector('.genres'),
  aboutFilms: document.querySelector('.text__information'),
};

const btnAddToWatch = document.querySelector('.library__button--active');
const backDrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.js-modal-btn');
const cardEl = document.querySelector('.gallery');
cardEl.addEventListener('click', onClickCard);

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

async function onClickCard(e) {
  if (
    e.target.className !== 'gallery__item' &&
    e.target.className !== 'gallery__image' &&
    e.target.className !== 'gallery__title' &&
    e.target.className !== 'gallery__genres' &&
    e.target.className !== 'gallery__date' &&
    e.target.className !== 'gallery__vote'
  ) {
    return console.dir(e.target);
  }

  backDrop.classList.remove('visually-hidden');

  if (e.target.className !== 'gallery__item') {
    searchName = e.target.parentElement.children[1].textContent;
  } else {
    searchName = e.target.children[1].textContent;
  }

  const { results } = await filmsAPI.searchMovies(searchName);
  const filmsData = results;
  // console.log("onClickCard ~ filmsData", filmsData)
  transformGenre(filmsData, genresList);

  const film = filmsData.map(films => {
    cardFilModal.imgFilm.src = `https://image.tmdb.org/t/p/original${films.poster_path}`;
    localStorageFilmCard.imgFilm = cardFilModal.imgFilm.src;
    cardFilModal.nameFilm.textContent = films.original_title;
    localStorageFilmCard.original_title = cardFilModal.nameFilm.textContent;
    cardFilModal.rating.textContent = films.vote_average;
    localStorageFilmCard.vote_average = cardFilModal.rating.textContent;
    cardFilModal.ratingCount.textContent = films.vote_count;
    localStorageFilmCard.vote_count = cardFilModal.ratingCount.textContent;
    cardFilModal.popularity.textContent = films.popularity;
    localStorageFilmCard.popularity = cardFilModal.popularity.textContent;
    cardFilModal.originalTitle.textContent = films.original_title;
    localStorageFilmCard.original_title =
      cardFilModal.originalTitle.textContent;
    cardFilModal.genres.textContent = films.genres;
    localStorageFilmCard.genres = cardFilModal.genres.textContent;
    cardFilModal.aboutFilms.textContent = films.overview;
    localStorageFilmCard.overview = cardFilModal.aboutFilms.textContent;
    return localStorageFilmCard;
  });

  btnClose.addEventListener('click', onBtnModalClose);
  document.addEventListener('keydown', onEscapeModalClose);
  backDrop.addEventListener('click', onBackDropModalClose);
  btnAddToWatch.addEventListener('click', btnAddLibraryFilm);
}

async function btnAddLibraryFilm(e) {
  const film = await localStorageFilmCard;
  localStorage.setItem('cardLibrary', JSON.stringify(film));
}
