import { LocStorageMovies } from '../auth-firebase/locstr-movies';

export async function manageBtnsState(id) {
  const btnAddToWatched = document.querySelector(
    '[data-action="add-to-watched"]'
  );
  const btnAddToQueue = document.querySelector('[data-action="add-to-queue"]');
  const isMovieInWatchedList = await LocStorageMovies.findMovieById(
    id,
    'watched'
  );
  if (isMovieInWatchedList) {
    btnAddToWatched.removeAttribute('js_add');
    btnAddToWatched.setAttribute('js_del', 'watched');
    btnAddToWatched.style.border = '2px solid';
    btnAddToWatched.style.borderColor = 'red';
    btnAddToWatched.textContent = 'Delete from Watched ';
  } else {
    btnAddToWatched.removeAttribute('js_del');
    btnAddToWatched.setAttribute('js_add', 'watched');
    btnAddToWatched.style.border = '';
    btnAddToWatched.style.borderColor = '';

    btnAddToWatched.textContent = 'Add to Watched ';
  }

  const isMovieInQueueList = await LocStorageMovies.findMovieById(id, 'queue');
  if (isMovieInQueueList) {
    btnAddToQueue.removeAttribute('js_add');
    btnAddToQueue.setAttribute('js_del', 'queue');
    btnAddToQueue.style.border = '2px solid';
    btnAddToQueue.style.borderColor = 'red';
    btnAddToQueue.textContent = 'Delete from Queue';
  } else {
    btnAddToQueue.removeAttribute('js_del');
    btnAddToQueue.setAttribute('js_add', 'queue');
    btnAddToQueue.style.border = '';
    btnAddToQueue.style.borderColor = '';
    btnAddToQueue.textContent = 'Add to Queue';
  }
}
