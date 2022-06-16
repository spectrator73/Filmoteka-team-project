let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  document.querySelector('main').classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
  document.querySelector('main').classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

button.addEventListener('click', () => {
  sun.classList.toggle('visible');
  moon.classList.toggle('visible');
});

if (darkMode === 'enabled') {
  enableDarkMode();
}
