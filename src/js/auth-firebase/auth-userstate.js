import { authRefs, defaultUserData } from './auth-refs';
import { LocStorage } from './auth-locstorage';
import { openModal } from './auth-modal';
import { signOutOfFirebase } from './firebase';

export function checkUserAuthState() {
  const userData = LocStorage.getItem();

  if (!userData || !userData.name) {
    authRefs.userName.textContent = defaultUserData.name;
    authRefs.btnSignOut.classList.add('visually-hidden');
    authRefs.authLine.classList.remove('visually-hidden');
    authRefs.authLine.addEventListener('click', onAuthLineClick);
    authRefs.btnSignOut.removeEventListener('click', onBtnSignOutClick);
  } else {
    authRefs.userName.textContent = userData.name;
    authRefs.authLine.classList.add('visually-hidden');
    authRefs.btnSignOut.classList.remove('visually-hidden');
    authRefs.btnSignOut.addEventListener('click', onBtnSignOutClick);
    authRefs.authLine.removeEventListener('click', onAuthLineClick);
  }
}

function onAuthLineClick(event) {
  const element = event.target.nodeName;
  if (element !== 'BUTTON') {
    return;
  }
  const elementAtr = event.target.attributes[1].name;
  openModal(elementAtr);
}

function onBtnSignOutClick() {
  signOutOfFirebase();
  LocStorage.removeItem();
  checkUserAuthState();
}
