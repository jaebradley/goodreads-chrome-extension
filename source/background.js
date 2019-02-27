import login from './login';

chrome.runtime.onMessage.addListener(async (obj, sender, sendResponse) => {
  if (obj) {
    if (obj.method === 'login') {
      await login();
    }
  }
});
