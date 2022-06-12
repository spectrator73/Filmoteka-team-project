import * as filmsAPI from './fetchFilms.js';
import { transformDate } from './transformDate';
import { transformGenre } from './transformGenre';
import genresJson from './genres.json';
import galleryMarkup from '../../templates/films-card.hbs'

const genresList = genresJson['genres'];
const refs = {
    gallery: document.querySelector('.gallery'),
}

export const onTrendingFilmsRender = async () => {
    const filmsData = await filmsAPI.fetchTrending();
    transformDate(filmsData);
    transformGenre(filmsData, genresList);
    console.log('Ready TrendigFilms for cards: ', filmsData);
    renderMarkup(filmsData); // !!! Render function awaits films card
}

function renderMarkup(filmsData) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(filmsData));
}