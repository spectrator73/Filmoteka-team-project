const refs = {
  btnList: document.querySelector('.library__button-wrap'),
};

refs.btnList.addEventListener('click', addActiveStyle);

let prevButton = null;
let firstRender = true;

function addActiveStyle(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (prevButton === null) {
    prevButton = e.target;
  }
  const button = e.target;
  button.classList.add('button-wrap__button--active');
  prevButton !== button && !firstRender
    ? prevButton.classList.remove('button-wrap__button--active')
    : button.classList.add('button-wrap__button--active');
  prevButton = e.target;
  firstRender = false;
}
