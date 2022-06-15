import * as filmsAPI from '../api/fetchFilms';
import { transformGenre } from '../api/transformGenre';
import genresJson from '../api/genres.json';

let searchName =''
const genresList = genresJson['genres'];

const cardFilModal = {
    nameFilm: document.querySelector('.about__title'),
    rating: document.querySelector('.rating'),
    ratingCount: document.querySelector('.rating-all'),
    popularity: document.querySelector('.popularity'),
    originalTitle: document.querySelector('.original-title'), 
    genres: document.querySelector('.genres'), 
    aboutFilms: document.querySelector('.text__information'), 
}

const backDrop = document.querySelector('.backdrop')
const btnClose = document.querySelector('.js-modal-btn')
const modalCard = document.querySelector('.modal')
const cardEl = document.querySelector('.gallery')
cardEl.addEventListener('click', onClickCard);

async function onClickCard(e) {
    if (e.target.className !== 'gallery__item'
        && e.target.className !== 'gallery__image'
        && e.target.className !== 'gallery__title'
        && e.target.className !== 'gallery__genres'
        && e.target.className !== 'gallery__date'
        && e.target.className !== 'gallery__vote'
    ) {
    return console.dir(e.target);;
    }

    backDrop.classList.remove("visually-hidden");
    if (e.target.className !== 'gallery__item') {
        searchName = e.target.parentElement.children[1].textContent;
    } else {
        searchName = e.target.children[1].textContent;
    }
    
    const { results } = await filmsAPI.searchMovies(searchName);
    const filmsData = results;
    console.log("onClickCard ~ filmsData", filmsData)
    transformGenre(filmsData, genresList);

    const cardFilmModalLocal = {};
    const film = filmsData.map( films  => {
        cardFilModal.nameFilm.textContent = films.original_title;
        cardFilModal.rating.textContent = films.vote_average;
        cardFilModal.ratingCount.textContent = films.vote_count;
        cardFilModal.popularity.textContent = films.popularity;
        cardFilModal.originalTitle.textContent = films.original_title;
        cardFilModal.genres.textContent = films.genres;
        cardFilModal.aboutFilms.textContent = films.overview;
        // return console.log('films', films.original_title);
    })

    // console.log('modalCard', modalCard);
    // modalCard.innerHTML = '';

//.visually-hidden забрати

    // function renderMarkup(filmsData) {
    //     // console.log("onClickCard ~ filmsData", filmsData)
    //     const x = galleryMarkup(filmsData);
    //     console.log("renderMarkup ~ x", typeof x)

    // modalCard.insertAdjacentHTML('afterbegin', x);
// }
    // renderMarkup(filmsData)


    btnClose.addEventListener('click', modalClose)
    document.addEventListener("keydown", onEscape)
    modalCard.addEventListener('click', onBackDrop)
} 

function onBackDrop(e) {
    console.dir(e.currentTarget.className);
    if (e.currentTarget.className !== 'modal') {
        backDrop.classList.add('visually-hidden');
        cardEl.removeEventListener('click', onBackDrop);
    }
}
function modalClose(e) {
    backDrop.classList.add('visually-hidden');
    cardEl.removeEventListener('click', modalClose);
}

function onEscape(e) {
    if (e.key === 'Escape') {
        backDrop.classList.add('visually-hidden');
        cardEl.removeEventListener('keydown', onEscape)
    }
}