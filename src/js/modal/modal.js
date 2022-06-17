import * as filmsAPI from '../api/fetchFilms';
import {genresModal} from '../modal/genresModal.js'
import {onBackDropModalClose} from '../modal/modal-close.js';
import {onBtnModalClose} from '../modal/modal-close.js';
import { onEscapeModalClose } from '../modal/modal-close.js'
// import { onAddLibraryFilm } from "../modal/film-in-localStorage.js";

let movieId =''

const cardFilModal = {
    id:'',
    imgFilm: document.querySelector('.img-film'),
    nameFilm: document.querySelector('.about__title'),
    rating: document.querySelector('.rating'),
    ratingCount: document.querySelector('.rating-all'),
    popularity: document.querySelector('.popularity'),
    originalTitle: document.querySelector('.original-title'), 
    genres: document.querySelector('.genres'), 
    aboutFilms: document.querySelector('.text__information'), 
}

const btnAddToWatch = document.querySelector('.library__button--active');
const backDrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.js-modal-btn');
const cardEl = document.querySelector('.gallery');
cardEl.addEventListener('click', onClickCard);

//object from localStorage
let localStorageFilmCard = {
    id:'',
    imgFilm: '',
    original_title: '',
    vote_average: '',
    vote_count: '',
    popularity: '',
    original_title: '',
    genres: '',
    overview:'',
}

export async function onClickCard(e) {
    //click on all liElement
    if (e.target.className !== 'gallery__item'
        && e.target.className !== 'gallery__image'
        && e.target.className !== 'gallery__title'
        && e.target.className !== 'gallery__genres'
        && e.target.className !== 'gallery__date'
        && e.target.className !== 'gallery__vote'
    ) {
    return 
    }

    backDrop.classList.remove("visually-hidden");

    const id = document.querySelector('.gallery__item');
    if (e.target.className !== 'gallery__item') {
        movieId = e.target.parentElement.dataset.id;
    } else {
        movieId = e.target.dataset.id;
    }

    //film on id
    const filmsData = await filmsAPI.getOneMovieDetails(movieId);
    genresModal(filmsData);

    cardFilModal.id = movieId;
    localStorageFilmCard.id = cardFilModal.id;
    cardFilModal.imgFilm.src = `https://image.tmdb.org/t/p/original${filmsData.poster_path}`;
    localStorageFilmCard.imgFilm = cardFilModal.imgFilm.src;
    cardFilModal.nameFilm.textContent = filmsData.original_title;
    localStorageFilmCard.original_title = cardFilModal.nameFilm.textContent;
    cardFilModal.rating.textContent = filmsData.vote_average;
    localStorageFilmCard.vote_average = cardFilModal.rating.textContent;
    cardFilModal.ratingCount.textContent = filmsData.vote_count;
    localStorageFilmCard.vote_count = cardFilModal.ratingCount.textContent;
    cardFilModal.popularity.textContent = filmsData.popularity;
    localStorageFilmCard.popularity = cardFilModal.popularity.textContent;
    cardFilModal.originalTitle.textContent = filmsData.original_title;
    localStorageFilmCard.original_title = cardFilModal.originalTitle.textContent;
    cardFilModal.genres.textContent = filmsData.genres;
    localStorageFilmCard.genres = cardFilModal.genres.textContent;
    cardFilModal.aboutFilms.textContent = filmsData.overview;
    localStorageFilmCard.overview = cardFilModal.aboutFilms.textContent;

    btnClose.addEventListener('click', onBtnModalClose)
    document.addEventListener("keydown", onEscapeModalClose)
    backDrop.addEventListener('click', onBackDropModalClose)
    btnAddToWatch.addEventListener('click', onAddLibraryFilm)
} 


const libraryFilms = [];
async function onAddLibraryFilm() {
    const film = await localStorageFilmCard;
    libraryFilms.push(film)
    localStorage.setItem("libraryFilms", JSON.stringify(libraryFilms));
    const savedSettings = localStorage.getItem("cardLibrary");
    const parsedSettings = JSON.parse(savedSettings);
}