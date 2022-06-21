export function transformDate(filmsData) {
  filmsData.map(film => {
    if (film.release_date) {
      film.release_date = film.release_date.slice(0, 4);
    }

    return film;
  });
}
