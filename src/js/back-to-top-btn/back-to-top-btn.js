import { throttle } from "lodash";
import SmoothScroll from "smooth-scroll";

const scroll = new SmoothScroll();
const refs = {
    backToTopBtn: document.querySelector('.js-back-to-top-btn'),
}

document.addEventListener('scroll', throttle(scrollTop, 500));
refs.backToTopBtn.addEventListener('click', handleBackToTop);

function scrollTop() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        refs.backToTopBtn.classList.add('top-btn--is-show');
    } else {
        refs.backToTopBtn.classList.remove('top-btn--is-show');
    };
}

function handleBackToTop() {
    scroll.animateScroll(document.body, { speed: 500, easing: 'Linear' });
}