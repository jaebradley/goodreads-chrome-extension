import login from './login';
import getSingleBookPageData from './content/data/getSingleBookPageData';

chrome.runtime.onMessage.addListener(async (obj) => {
  if (obj) {
    if (obj.method === 'login') {
      await login();
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
