import { LocStorageMovies } from '../auth-firebase/locstr-movies';

export function manageBtnsState(id) {
  console.log('Это менедж');
  const btnAddToWatched = document.querySelector(
    '[data-action="add-to-watched"]'
  );
  const btnAddToQueue = document.querySelector('[data-action="add-to-queue"]');
  const isMovieInWatchedList = LocStorageMovies.findMovieById(id, 'watched');
  if (isMovieInWatchedList) {
    btnAddToWatched.removeAttribute('js_add');
    btnAddToWatched.setAttribute('js_del', 'watched');
    // btnAddToWatched.style.backgroundColor = 'green';
    btnAddToWatched.textContent = 'Delete from Watched ';
  } else {
    btnAddToWatched.removeAttribute('js_del');
    btnAddToWatched.setAttribute('js_add', 'watched');
    // btnAddToWatched.style.backgroundColor = '';
    btnAddToWatched.textContent = 'Add to Watched ';
  }

  const isMovieInQueueList = LocStorageMovies.findMovieById(id, 'queue');
  if (isMovieInQueueList) {
    btnAddToQueue.removeAttribute('js_add');
    btnAddToQueue.setAttribute('js_del', 'queue');
    // btnAddToQueue.style.backgroundColor = 'yellow';
    btnAddToQueue.textContent = 'Delete from Queue';
  } else {
    btnAddToQueue.removeAttribute('js_del');
    btnAddToQueue.setAttribute('js_add', 'queue');
    // btnAddToQueue.style.backgroundColor = '';
    btnAddToQueue.textContent = 'Add to Queue';
  }
}
