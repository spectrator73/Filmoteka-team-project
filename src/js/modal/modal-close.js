const backDrop = document.querySelector('.backdrop')
const cardEl = document.querySelector('.gallery')

function removeListener() {
    backDrop.classList.add('visually-hidden');
    cardEl.removeEventListener('click', onBackDropModalClose);
}
export function onBackDropModalClose(e) {
    if (e.target.className !== 'backdrop js-modal') {
        return;
    }
    removeListener();
}
export function onBtnModalClose(e) {
    removeListener();
}

export function onEscapeModalClose(e) {
    if (e.key !== 'Escape') {
        return;
    }
    removeListener();
}