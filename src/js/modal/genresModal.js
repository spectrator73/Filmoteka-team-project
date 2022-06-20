export function genresModal(filmsData) {
    let newGenre = [];
    const genre = filmsData.genres.map(film => newGenre.push(film.name));
    filmsData.genres = newGenre.join(', ');
    return filmsData.genres
}