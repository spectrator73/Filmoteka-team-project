import { throttle } from "lodash";
const refs = {
    backToTopBtn: document.querySelector('.js-back-to-top-btn'),
}

document.addEventListener('scroll', throttle(scrollTop, 500));
refs.backToTopBtn.addEventListener('click', handleBackToTop);

function scrollTop() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        refs.backToTopBtn.style.display = "flex";
    } else {
        refs.backToTopBtn.style.display = "none";
    };
}

function handleBackToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}