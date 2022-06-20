import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class LocStorageMovies {
  static queue = 'queue';
  static watched = 'watched';

  static setItem(item) {
    const arrOfWatchedMoviesList = [];
    const arrOfQueueMoviesList = [];
    for (let i = 0; i < item.length; i += 1) {
      let el = item[i];
      if (el.preftype === LocStorageMovies.queue) {
        arrOfQueueMoviesList.push(el);
      } else if (el.preftype === LocStorageMovies.watched) {
        arrOfWatchedMoviesList.push(el);
      } else {
        Notify.failure('The film has no preference label.');
        continue;
      }
      localStorage.setItem(
        `${LocStorageMovies.queue}List`,
        JSON.stringify(arrOfQueueMoviesList)
      );

      localStorage.setItem(
        `${LocStorageMovies.watched}List`,
        JSON.stringify(arrOfWatchedMoviesList)
      );
    }
  }

  static findMovieById(id, value) {
    const movieList = LocStorageMovies.getMoviesList(value);
    if (!movieList) {
      return null;
    }
    const filteredMovieListById = movieList.filter(item => item.id === id);
    if (filteredMovieListById.length > 0) {
      return true;
    } else {
      return null;
    }
  }

  static getMoviesList(value) {
    if (value === LocStorageMovies.queue) {
      try {
        const moviesList = JSON.parse(
          localStorage.getItem(`${LocStorageMovies.queue}List`)
        );
        if (moviesList === null || moviesList.length === 0) {
          return null;
        }
        return moviesList;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    } else {
      try {
        const moviesList = JSON.parse(
          localStorage.getItem(`${LocStorageMovies.watched}List`)
        );
        if (moviesList === null || moviesList.length === 0) {
          return null;
        }
        return moviesList;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  }

  static getFrbKeyByMovieId(id, value) {
    const moviesList = LocStorageMovies.getMoviesList(value);
    if (!moviesList) {
      return;
    }

    let keyfrb = '';
    for (let i = 0; i < moviesList.length; i += 1) {
      let movie = moviesList[i];
      if (movie.id === id) {
        keyfrb = movie.keyfrb;
        break;
      }
    }
    return keyfrb;
  }

  static removeMovieList(value) {
    value === LocStorageMovies.queue
      ? localStorage.removeItem(`${LocStorageMovies.queue}List`)
      : localStorage.removeItem(`${LocStorageMovies.watched}List`);
  }

  static clearMoviesLists() {
    localStorage.removeItem(`${LocStorageMovies.queue}List`);
    localStorage.removeItem(`${LocStorageMovies.watched}List`);
  }
}

export function convertDataFromFrbToLs(data) {
  const objKeysFrbData = Object.keys(data);
  const arrData = objKeysFrbData.map(keyfrb => {
    return { ...data[keyfrb], keyfrb };
  });

  return arrData;
}
