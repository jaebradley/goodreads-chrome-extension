import 'chrome-storage-promise';
import login from './login';
import getSingleBookPageData from './content/data/getSingleBookPageData';
import createClient from './createClient';

chrome.runtime.onMessage.addListener(async (obj) => {
  if (obj) {
    if (obj.method === 'login') {
      await login();
    } else if (obj.method === 'ADD_BOOK_TO_SHELF') {
      const {
        jwt,
      } = await chrome.storage.promise.sync.get();
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
        } = await chrome.storage.promise.sync.get();
        const data = await getSingleBookPageData({ jwt, isbn });
        port.postMessage(data);
      });
    }
  }
});
