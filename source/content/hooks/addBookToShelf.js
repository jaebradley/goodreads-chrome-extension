import {
  useCallback,
} from 'react';
import browser from 'webextension-polyfill';

export default function addBookToShelf({ shelfName, bookId, onAdd }) {
  return useCallback(() => {
    const port = browser.runtime.connect({ name: 'ADD_BOOK_TO_SHELF' });
    port.postMessage({ shelfName, bookId });
    port.onMessage.addListener(() => {
      const getReviewPort = browser.runtime.connect({ name: 'GET_BOOK_REVIEW' });
      getReviewPort.postMessage({ bookId });
      getReviewPort.onMessage.addListener(message => onAdd(message));
    });
  });
}
