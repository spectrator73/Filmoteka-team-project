import * as filmsAPI from '../api/fetchFilms';
import { transformGenre } from '../api/transformGenre';
import genresJson from '../api/genres.json';

const genresList = genresJson['genres'];
let searchName =''

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
    return;
    }


    if (e.target.className !== 'gallery__item') {
        searchName = e.target.parentElement.children[1].textContent;
    } else {
        searchName = e.target.children[1].textContent;
    }
    const {results} = await filmsAPI.searchMovies(searchName);
    const filmsData = results;
    
    transformGenre(filmsData, genresList);
    // console.log('filmsData',filmsData);

// console.dir(e.target)
//  console.dir(...filmsData);
} 

