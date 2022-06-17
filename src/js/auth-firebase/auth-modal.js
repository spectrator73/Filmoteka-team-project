import { authRefs } from './auth-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { signUp, signIn, updateUserProfile } from './firebase';
import { LocStorage } from './auth-locstorage';
import { checkUserAuthState } from './auth-userstate';
import { createUserDtbName } from './firebase-db';

let isRegisteredUser = '';

export function openModal(elementAtr) {
  if (elementAtr === 'js-signin') {
    authRefs.titleModal.textContent = 'Authorization Form';
    authRefs.formUserName.classList.add('visually-hidden');
    isRegisteredUser = true;
    // console.log('SIGN IN');
  } else if (elementAtr === 'js-signup') {
    authRefs.titleModal.textContent = 'Registration Form';
    authRefs.formUserName.classList.remove('visually-hidden');
    isRegisteredUser = false;
    // console.log('SIGN UP');
  } else {
    return;
  }
  authRefs.backdropModal.classList.remove('visually-hidden');
  authRefs.btnModalClose.addEventListener('click', onModalBtnClose);
  authRefs.form.addEventListener('submit', onFormSubmit);
}

function onModalBtnClose() {
  authRefs.form.reset();
  authRefs.backdropModal.classList.add('visually-hidden');
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
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
    Notify.success('You are signed in');
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

  // console.log(userEmail, userPassword);

  isRegisteredUser = '';
  authRefs.btnModalClose.removeEventListener('click', onModalBtnClose);
  authRefs.form.removeEventListener('submit', onFormSubmit);
}
