import { authRefs } from './auth-refs';
import { signUp, signIn, updateUserProfile } from './firebase';
import { LocStorage } from './auth-locstorage';
import { checkUserAuthState } from './auth-userstate';
import { createUserDtbName } from './firebase-db';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let isRegisteredUser = '';

const body = document.querySelector('body');

export function openModal(elementAtr) {
  body.style.overflow = 'hidden';
  if (elementAtr === 'js-signin') {
    authRefs.titleModal.textContent = 'Authorization Form';
    authRefs.formUserName.classList.add('visually-hidden');
    isRegisteredUser = true;
  } else if (elementAtr === 'js-signup') {
    authRefs.titleModal.textContent = 'Registration Form';
    authRefs.formUserName.classList.remove('visually-hidden');
    isRegisteredUser = false;
  } else {
    return;
  }

  authRefs.backdropModal.classList.remove('visually-hidden');
  authRefs.btnModalClose.addEventListener('click', onModalBtnClose);
  authRefs.backdropModal.addEventListener('click', onBackdrop);
  authRefs.form.addEventListener('submit', onFormSubmit);
  window.addEventListener('keydown', onEscPress);
}

function onModalBtnClose() {
  authRefs.form.reset();
  body.style.overflow = 'visible';
  authRefs.backdropModal.classList.add('visually-hidden');
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
  authRefs.backdropModal.removeEventListener('click', onBackdrop);
  window.removeEventListener('keydown', onEscPress);
}

function onBackdrop(event) {
  if (event.target.classList.value !== 'auth-modal__backdrop') {
    return;
  }
  body.style.overflow = 'visible';
  authRefs.form.reset();
  authRefs.backdropModal.classList.add('visually-hidden');
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
  authRefs.backdropModal.removeEventListener('click', onBackdrop);
  window.removeEventListener('keydown', onEscPress);
}

function onEscPress(event) {
  if (event.key !== 'Escape') {
    return;
  }
  body.style.overflow = 'visible';
  authRefs.form.reset();
  authRefs.backdropModal.classList.add('visually-hidden');
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
  authRefs.backdropModal.removeEventListener('click', onBackdrop);
  window.removeEventListener('keydown', onEscPress);
}

async function onFormSubmit(event) {
  event.preventDefault();

  const userName = event.currentTarget.elements.username.value.trim();
  const userEmail = event.currentTarget.elements.email.value.trim();
  const userPassword = event.currentTarget.elements.password.value.trim();

  if ((!isRegisteredUser && !userName) || !userEmail || !userPassword) {
    Notify.failure('Wrong email or password. Try again.');
    authRefs.form.reset();
    return;
  }

  if (isRegisteredUser) {
    const responseSignIn = await signIn(userEmail, userPassword);
    if (!responseSignIn) {
      Notify.failure('Wrong email or password. Try again.');
      return;
    }
    // Notify.success('You are signed in');
    body.style.overflow = 'visible';
    const currentUserData = {
      name: responseSignIn.displayName,
      email: responseSignIn.email,
      uid: responseSignIn.uid,
      dbName: '',
    };
    const currentUserDtbName = createUserDtbName(currentUserData);

    LocStorage.setItem(currentUserDtbName);
    checkUserAuthState();
  } else {
    const responseSignUp = await signUp(userEmail, userPassword);
    if (!responseSignUp) {
      Notify.failure('Wrong registration.Try again.');
      return;
    }
    await updateUserProfile(userName);
    Notify.success(
      `Congratulation! New user ${userName} has been just registered.`
    );
    body.style.overflow = 'visible';
    const currentUserData = {
      name: userName,
      email: responseSignUp.email,
      uid: responseSignUp.uid,
      dbName: '',
    };
    const currentUserDtbName = createUserDtbName(currentUserData);

    LocStorage.setItem(currentUserDtbName);
    checkUserAuthState();
  }

  authRefs.form.reset();
  authRefs.backdropModal.classList.add('visually-hidden');

  isRegisteredUser = '';
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
  authRefs.backdropModal.removeEventListener('click', onBackdrop);
  authRefs.form.removeEventListener('submit', onFormSubmit);
  window.removeEventListener('keydown', onEscPress);
}
