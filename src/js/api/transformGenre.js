export function transformGenre(filmsData, genresList) {
    filmsData.map(film => {
        let newGenre = [];

        if (film.genre_ids) {
            film.genre_ids.forEach(id => {
                const rigthID = genresList.find(genreFromList => genreFromList.id === id);
                newGenre.push(rigthID.name);
            });
            }
            
        if (newGenre.length > 3) {
            const manyGenres = newGenre.slice(0, 2);
            manyGenres.push('Other');
            film.genres = manyGenres.join(', ');
        } else {
            film.genres = newGenre.join(', ');
        }

        return film;
    });
}