export function addFilmsToLocal(film, localKey) {
  let existingFilms = JSON.parse(localStorage.getItem(`${localKey}`));
  if (existingFilms == null) {
    existingFilms = [];
  }
  const checkingId = existingFilms.find(({ id }) => id === film.id);
  if (!checkingId) {
    existingFilms.push(film);
  }
  localStorage.setItem(`${localKey}`, JSON.stringify(existingFilms));
}
