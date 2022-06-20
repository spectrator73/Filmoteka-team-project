export function darkModalTheme(e) {
    const mainEl = document.querySelector('main');
    const modalEl = document.querySelector('.modal');
    const btnClose = document.querySelector('.js-modal-btn');
    const textVote = document.querySelectorAll('.about__item-key')

    if (mainEl.className !== 'darkmode') {
        modalEl.style.backgroundColor = '#fff';
        btnClose.style.backgroundColor = '#fff';
        textVote.forEach(textVote =>textVote.style.color = '#8c8c8c');
    } else {
        modalEl.style.backgroundColor = '#8c8c8c';
        btnClose.style.backgroundColor = '#8c8c8c';
        textVote.forEach(textVote =>textVote.style.color = '#000');
        
    }
}
