const refs = {
  btnList: document.querySelector('.library__button-wrap'),
  btnActive: document.querySelector('.button-wrap__button--active'),
};

refs.btnList.addEventListener('click', addActiveStyle);

let prevButton = null;

function addActiveStyle(e) {
  const button = e.target;
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (refs.btnActive.classList.contains('button-wrap__button--active')) {
    refs.btnActive.classList.remove('button-wrap__button--active')
    button.classList.add('button-wrap__button--active')
  }
  if (prevButton !== button && prevButton !== null) {
    prevButton.classList.remove('button-wrap__button--active')
    button.classList.add('button-wrap__button--active');
  }
  prevButton = e.target;
}
