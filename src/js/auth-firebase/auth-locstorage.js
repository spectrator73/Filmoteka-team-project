import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class LocStorage {
  static key = 'userData';

  static setItem(item) {
    const itemToJSON = JSON.stringify(item);
    if (!itemToJSON) {
      Notify.failure('Invalid data.');
      return;
    }
    localStorage.setItem(LocStorage.key, itemToJSON);
  }

  static getItem() {
    try {
      return JSON.parse(localStorage.getItem(LocStorage.key));
    } catch (error) {
      Notify.failure(error.message);
      return null;
    }
  }

  static removeItem() {
    localStorage.removeItem(LocStorage.key);
  }
}
