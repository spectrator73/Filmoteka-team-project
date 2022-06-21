import './auth-refs';
import './auth-locstorage';
import './firebase';
import './modal-btns-state';

import {
  getDatafromFirebase,
  postDataToFirebase,
} from '../auth-firebase/firebase-db';
import { LocStorageMovies } from '../auth-firebase/locstr-movies';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  getDatafromFirebase,
  removeDataFromDb,
} from '../auth-firebase/firebase-db';
import { manageBtnsState } from '../auth-firebase/modal-btns-state';

import { checkUserAuthState } from './auth-userstate';

checkUserAuthState();

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
    await getDatafromFirebase();
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

  setTimeout(() => manageBtnsState(movieDetails.id), 100);
}
