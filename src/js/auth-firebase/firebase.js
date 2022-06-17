import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { checkUserAuthState } from './auth-userstate';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firebaseConfig = {
  apiKey: 'AIzaSyB6zHPU06WTT-Wfbp-gtmlww2BBH4EyQx0',
  authDomain: 'filmoteka-project2.firebaseapp.com',
  databaseURL:
    'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-project2',
  storageBucket: 'filmoteka-project2.appspot.com',
  messagingSenderId: '660298397256',
  appId: '1:660298397256:web:554a4c6f7606a778a94a7d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function signUp(email, password) {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // console.log(userCredential);
      return userCredential.user;
    })
    .catch(error => {
      const errorMessage = error.message;
      // ..
    });
}

// To sign in to Firebase with email and password
export function signIn(email, password) {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => userCredential.user)
    .catch(error => {
      console.log(error.message);
    });
}

// To sign out of Firebase
export function signOutOfFirebase() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      Notify.success('Bye, bye. We will miss you!');
      checkUserAuthState();
    })
    .catch(error => {
      // An error happened.
      //   Notify.failure("SignOut doesn't work");
    });
}

// To update user profile in Firebase
export function updateUserProfile(userName) {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: userName,
  })
    .then(() => {
      //   Notify.success('User profile is created.');
    })
    .catch(error => {
      //   Notify.failure("User profile isn't created.");
    });
}

// To get user profile in Firebase
export function getUserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    // console.log('user', user);
    user.providerData.forEach(profile => {
      console.log('Sign-in provider: ' + profile.providerId);
      console.log('  Provider-specific UID: ' + profile.uid);
      console.log('  Name: ' + profile.displayName);
      console.log('  Email: ' + profile.email);
      console.log('  Photo URL: ' + profile.photoURL);
    });
  }
}

// getUserProfile();
// updateUserProfile();
// signOutOfFirebase();
