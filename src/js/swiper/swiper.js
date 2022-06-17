import * as filmsAPI from '../api/fetchFilms.js';
import Swiper, { Navigation, Autoplay } from 'swiper';

const swiperContainer = document.querySelector('.swiper-wrapper');

async function trendingMoviesRender() {
  const data = await filmsAPI.fetchTrending();
	renderMovieCardsSlider(data)
}

function renderMovieCardsSlider(results) {
	
	const markup = results.map(({ poster_path, id }) => {
		
		let imagePoster = `https://image.tmdb.org/t/p/w500${poster_path}`;		
		
		return `<div class="swiper-slide">
				<img src="${imagePoster}" alt="poster" class="slide-poster" data-id="${id}"/>
			</div>`;
    }).join(''); 
  swiperContainer.insertAdjacentHTML("beforeend", markup);
}
trendingMoviesRender()

const swiper = new Swiper('.mySwiper', {
    modules: [Navigation, Autoplay],
    spaceBetween: 5,
    breakpointsBase: 'container',
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        210: {
            slidesPerView: 2,
        },
        600: {
            slidesPerView: 6,
        },
        768: {
            slidesPerView: 8,
        },
    },
    });



