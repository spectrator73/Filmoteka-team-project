import './auth-refs';
import './auth-locstorage';
import './firebase';
import './database-refs';
import './modal-btns-state';

// import { getUserProfile, signOutOfFirebase } from './js/firebase';
import {
  getDatafromFirebase,
  postDataToFirebase,
  clearDtbFirebase,
} from '../auth-firebase/firebase-db';
import {
  LocStorageMovies,
  checkMovieInLs,
} from '../auth-firebase/locstr-movies';
// import { renderMoviesList } from './js/render-list';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { checkUserAuthState, checkAuthUser } from './js/auth-state';
// import { getMovieId } from './js/base';
import {
  getDatafromFirebase,
  removeDataFromDb,
} from '../auth-firebase/firebase-db';
import { manageBtnsState } from '../auth-firebase/modal-btns-state';

import { checkUserAuthState } from './auth-userstate';

checkUserAuthState();

// refs.btnAddToQueue.addEventListener('click', onAddBtn);
// refs.btnAddToWatched.addEventListener('click', onAddBtn);
// refs.btnQueue.addEventListener('click', onQueueWatchedBtn);
// refs.btnWatched.addEventListener('click', onQueueWatchedBtn);
// refs.btnDelFromWatched.addEventListener('click', onBtnDel);
// refs.btnDelFromQueue.addEventListener('click', onBtnDel);

// ----Old Version ------
// export function onAddBtn(event) {
//   const jsAttrValue = event.target.attributes.js_add.value;
//   const value = getMovieValueState(jsAttrValue);

//   const movieDetails = getOneMovieDetails();
//   const isMovieInLs = LocStorageMovies.findMovieById(movieDetails.id, value);
//   if (isMovieInLs) {
//     Notify.failure('This movie is already in the library.');
//     return;
//   }

//   movieDetails.preftype = value;
//   postDataToFirebase(movieDetails);
// }

// ----Modified Version ------
export async function onAddBtn(event, movieDetails) {
  const jsAttr = event.target.attributes;
  let jsAttrValue = '';

  if (jsAttr.js_del) {
    jsAttrValue = jsAttr.js_del.value;
    const frbKey = LocStorageMovies.getFrbKeyByMovieId(
      movieDetails.id,
      jsAttrValue
    );
    await removeDataFromDb(frbKey);
    console.log('Приход ответа по удалению');
    getDatafromFirebase();
  } else {
    jsAttrValue = jsAttr.js_add.value;

    const isMovieInLs = LocStorageMovies.findMovieById(
      movieDetails.id,
      jsAttrValue
    );
    if (isMovieInLs) {
      Notify.failure('This movie is already in the library.');
      return;
    }

    movieDetails.preftype = jsAttrValue;
    await postDataToFirebase(movieDetails);
    await getDatafromFirebase();
  }
  console.log('Конец функции');

  setTimeout(() => manageBtnsState(movieDetails.id), 100);
}

// function onQueueWatchedBtn(event) {
//   const isUserAuthorised = checkAuthUser();
//   if (!isUserAuthorised) {
//     Notify.failure(
//       'You are not authorized. Please sign in to your account or register.'
//     );
//     return;
//   }

//   const jsAttrValue = event.target.attributes.js_state.value;
//   const value = getMovieValueState(jsAttrValue);

//   const moviesList = LocStorageMovies.getMoviesList(value);
//   if (!moviesList) {
//     Notify.failure('Movie list is empty.');
//     LocStorageMovies.removeMovieList(value);
//   }
//   renderMoviesList(moviesList, value);
// }

// function onBtnDel(event) {
//   const isUserAuthorised = checkAuthUser();
//   if (!isUserAuthorised) {
//     Notify.failure(
//       'You are not authorized. Please sign in to your account or register.'
//     );
//     return;
//   }

//   const jsAttrValue = event.target.attributes.js_del.value;
//   const value = getMovieValueState(jsAttrValue);

//   const movieId = getMovieId();
//   const frbId = LocStorageMovies.getFrbKeyByMovieId(movieId, value);
//   if (!frbId) {
//     Notify.failure('Something went wrong.');
//     return;
//   }
//   removeDataFromDb(frbId);
// }

// function getMovieValueState(value) {
//   if (value === 'watched') {
//     return 'watched';
//   } else if (value === 'queue') {
//     return 'queue';
//   } else {
//     return;
//   }
// }
