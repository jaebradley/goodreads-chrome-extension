import browser from 'webextension-polyfill';

import login from './login';
import getSingleBookPageData from './content/data/getSingleBookPageData';
import getSingleBookPageDataFromSearch from './content/data/getSingleBookPageDataFromSearch';
import createClient from './createClient';
import parseReviewResponse from './content/data/parseReviewResponse';

chrome.runtime.onMessage.addListener(async (obj) => {
  if (obj) {
    if (obj.method === 'login') {
      await login();
    } else if (obj.method === 'ADD_BOOK_TO_SHELF') {
      const {
        jwt,
      } = await browser.storage.sync.get();
      const client = createClient({ jwt });
      await client.user.shelves.addBook({ shelfName: obj.data.shelfName, bookId: obj.data.bookId });
    }
  }
});

chrome.runtime.onConnect.addListener(async (port) => {
  if (port) {
    if (port.name === 'BOOK_PAGE_DATA') {
      port.onMessage.addListener(async (message) => {
        const {
          isbn,
        } = message;
        const {
          jwt,
        } = await browser.storage.sync.get();
        const data = await getSingleBookPageData({ jwt, isbn });
        port.postMessage(data);
      });
    } else if (port.name === 'BOOK_PAGE_DATA_FROM_SEARCH') {
      port.onMessage.addListener(async (message) => {
        const {
          author,
          title,
        } = message;
        const {
          jwt,
        } = await browser.storage.sync.get();
        const data = await getSingleBookPageDataFromSearch({ jwt, title, author });
        port.postMessage(data);
      });
    } else if (port.name === 'REMOVE_BOOK_FROM_SHELF') {
      port.onMessage.addListener(async (message) => {
        const {
          shelfName,
          bookId,
        } = message;
        const {
          jwt,
        } = await browser.storage.sync.get();
        const client = createClient({ jwt });
        const response = await client.user.shelves.removeBook({ shelfName, bookId });
        port.postMessage(response.data);
      });
    } else if (port.name === 'GET_BOOK_REVIEW') {
      port.onMessage.addListener(async (message) => {
        const {
          bookId,
        } = message;
        const {
          jwt,
        } = await browser.storage.sync.get();
        try {
          const client = createClient({ jwt });
          const bookReviewResponse = await client.user.books.getReview(bookId);
          const bookReview = parseReviewResponse(bookReviewResponse.data.GoodreadsResponse.review);
          port.postMessage(bookReview);
        } catch (e) {
          if (!e || !e.response || e.response.status !== 404) {
            throw e;
          }
          port.postMessage(null);
        }
      });
    }
  }
});
