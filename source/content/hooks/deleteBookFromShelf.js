import {
  useCallback,
} from 'react';
import browser from 'webextension-polyfill';

export default function deleteBookFromShelf({ name, bookId, onDelete }) {
  return useCallback(() => {
    const port = browser.runtime.connect({ name: 'REMOVE_BOOK_FROM_SHELF' });
    port.postMessage({ shelfName: name, bookId });
    port.onMessage.addListener(() => {
      const getReviewPort = browser.runtime.connect({ name: 'GET_BOOK_REVIEW' });
      getReviewPort.postMessage({ bookId });
      getReviewPort.onMessage.addListener((message) => {
        onDelete(message);
      });
    });
  });
}
