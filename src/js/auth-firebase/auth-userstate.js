import { authRefs, defaultUserData } from './auth-refs';
import { LocStorage } from './auth-locstorage';
import { openModal } from './auth-modal';
import { signOutOfFirebase } from './firebase';

export function checkUserAuthState() {
  const userData = LocStorage.getItem();
  // console.log('userData from LC:', userData);
  if (!userData || !userData.name) {
    authRefs.userName.textContent = defaultUserData.name;
    authRefs.btnSignOut.classList.add('visually-hidden');
    authRefs.authLine.classList.remove('visually-hidden');
    authRefs.authLine.addEventListener('click', onAuthLineClick);
    authRefs.btnSignOut.removeEventListener('click', onBtnSignOutClick);
    // authRefs.btnGetUserProfile.disabled = true;
  } else {
    authRefs.userName.textContent = userData.name;
    authRefs.authLine.classList.add('visually-hidden');
    authRefs.btnSignOut.classList.remove('visually-hidden');
    authRefs.btnSignOut.addEventListener('click', onBtnSignOutClick);
    authRefs.authLine.removeEventListener('click', onAuthLineClick);
    // authRefs.btnGetUserProfile.disabled = false;
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
  // console.log('SIGNOUT');
  signOutOfFirebase();
  LocStorage.removeItem();
  checkUserAuthState();
  //   refs.btnGetUserProfile.disabled = true;
}
