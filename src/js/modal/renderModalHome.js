export function renderModal({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  const markupModal = `        <img
        class="img-film"
        src="https://image.tmdb.org/t/p/original${poster_path}"
        alt=""
      />
      <div class="about">
        <h2 class="about__title">${original_title}</h2>
        <ul class="about__list">
          <li class="about__item">
            <p class="about__item-key">Vote / Votes</p>
            <p class="about__item-value">
              <p class="rating">${vote_average}</p>
              <span class="rating-text">/</span>
              <p class="rating rating-all">${vote_count}</p>
            </p>
          </li>
          <li class="about__item">
            <p class="about__item-key">Popularity</p>
            <p class="about__item-value">
              <span>${popularity}</span>
            </p>
          </li>
          <li class="about__item">
            <p class="about__item-key">Original Title</p>
            <p class="about__item-value">
              <span>${original_title}</span>
            </p>
          </li>
          <li class="about__item">
            <p class="about__item-key">Genre</p>
            <p class="about__item-value">
              <span>${genres}</span>
            </p>
          </li>
        </ul>
        <div class="text">
          <p class="text__title">ABOUT</p>
          <p class="text__information">
            ${overview}
          </p>
        </div>
        <div class="button-modal">
          <button class="modal__btn-active btn modal__btn" data-action="add-to-watched" js_add="watched">add to Watched</button>
          <button class=" btn modal__btn " data-action="add-to-queue" js_add="queue">add to queue</button>
        </div>
      </div>
`;
  return markupModal;
}
