import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LocStorage } from './auth-locstorage';
import {
  LocStorageMovies,
  convertDataFromFrbToLs,
} from '../auth-firebase/locstr-movies';

const URL =
  'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app';
const API = 'AIzaSyB6zHPU06WTT-Wfbp-gtmlww2BBH4EyQx0';

export async function getDatafromFirebase() {
  const userDtbName = getUserDtbName();
  let x = '';
  if (!userDtbName) {
    return;
  }
  await fetch(`${URL}/${userDtbName}.json`)
    .then(response => response.json())
    .then(data => {
      if (!data) {
        // Notify.failure('Your database is EMPTY.');
        LocStorageMovies.clearMoviesLists();
        return;
      }

      const convertedData = convertDataFromFrbToLs(data);
      LocStorageMovies.setItem(convertedData);
    });
}

export async function postDataToFirebase(data) {
  const userDtbName = getUserDtbName();
  if (!userDtbName) {
    return;
  }
  await fetch(`${URL}/${userDtbName}.json`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      Notify.failure("Can't update your database. Try again.");
      return;
    }

    // Notify.success('Your database is updated. Push the GET data button.');
  });
}

export async function removeDataFromDb(id) {
  const userDtbName = getUserDtbName();
  if (!userDtbName || !id) {
    return;
  }
  return await fetch(`${URL}/${userDtbName}/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);
}

export function clearDtbFirebase() {
  const userDtbName = getUserDtbName();
  if (!userDtbName) {
    return;
  }
  fetch(`${URL}/${userDtbName}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.ok) {
      Notify.success('Your database has been cleared.');
      return;
    }
  });
}

export function createUserDtbName(currentUserData) {
  const { name, uid } = currentUserData;
  const dbName = `${name}_${uid.slice(0, 9)}`;
  return { ...currentUserData, dbName };
}

function getUserDtbName() {
  const userData = LocStorage.getItem();
  if (!userData || !userData.dbName) {
    Notify.failure("User isn't authorized. Please sign in or register.");
    return null;
  }

  return userData.dbName;
}
