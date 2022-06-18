import teamTemplate from '../templates/team.hbs';
import team from './api/team.json';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';
import showConfetti from './components/confetti';

const modalContainer = document.querySelector('#js-team-modal');
modalContainer.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  showConfetti();

  try {
    getTeamInfo(team);
  } catch (error) {
    errorModal();
    console.error('Smth wrong with team modal window' + error);
  }
}
// Function for getting data from Json
function getTeamInfo(teamId) {
    const teamMarkup = teamTemplate(teamId);
    const modalContent = basicLightbox.create(teamMarkup);

    modalContent.show();

    window.addEventListener('keydown', closeModalByEsc);

    function closeModalByEsc(e) {
        if (e.code === 'Escape') {
            modalContent.close();

            window.removeEventListener('keydown', closeModalByEsc);
        }
    }
    const btnCloseRef = document.querySelector('.close__button');
    btnCloseRef.addEventListener('click', closeModalbyBtn);
    function closeModalbyBtn() {
        modalContent.close();

        btnCloseRef.removeEventListener('click', closeModalbyBtn);
    }

}