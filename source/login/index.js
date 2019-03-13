import qs from 'query-string';
import browser from 'webextension-polyfill';

import getAccessToken from './getAccessToken';
import getRequestToken from './getRequestToken';


export default async function login() {
  const {
    token: requestToken,
    secret: requestTokenSecret,
  } = await getRequestToken();
  const authorizeQuery = qs.stringify({
    oauth_token: requestToken,
    redirect_uri: 'https://goodreads.com',
  });
  const url = `https://goodreads.com/oauth/authorize?${authorizeQuery}`;

  const tab = await browser.tabs.create({
    url,
    active: true,
  });

  browser.tabs.onUpdated.addListener(async (tabId, info) => {
    if (info.status === 'complete' && tabId === tab.id) {
      const jwt = await getAccessToken({ requestToken, requestTokenSecret });
      await browser.storage.sync.set({ jwt });
    }
  });
}
