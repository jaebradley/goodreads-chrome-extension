import login from './login';

chrome.runtime.onMessage.addListener(async (obj) => {
  if (obj) {
    if (obj.method === 'login') {
      await login();
    }
  }
});
