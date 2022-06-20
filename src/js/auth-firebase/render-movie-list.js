import { refs } from './base';

export function renderMoviesList(moviesList, value) {
  if (value === 'queue') {
    refs.queueList.innerHTML = '';
    if (!moviesList) {
      return;
    }
    const markup = createMarkup(moviesList);
    refs.queueList.innerHTML = markup;
  } else {
    refs.watchedList.innerHTML = '';
    if (!moviesList) {
      return;
    }
    const markup = createMarkup(moviesList);
    refs.watchedList.innerHTML = markup;
  }
}

function createMarkup(data) {
  return data.map(item => `<div>${JSON.stringify(item)}</div>`).join(',');
}

export function clearRenderMoviesList() {
  refs.queueList.innerHTML = '';
  refs.watchedList.innerHTML = '';
}
