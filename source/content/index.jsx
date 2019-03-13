import React from 'react';
import ReactDOM from 'react-dom';

import domLoaded from 'dom-loaded';

import App from './App';

async function inject() {
  await domLoaded;
  // Kindle Tab
  let element = document.getElementById('reviewFeatureGroup');
  if (!element) {
    // Hard Cover Tab
    element = document.getElementById('averageCustomerReviews');
  }

  if (element) {
    const appDiv = document.createElement('div');
    appDiv.setAttribute('id', 'goodreads-extension');
    element.parentNode.insertBefore(appDiv, element.nextSibling);
    ReactDOM.render(<App />, appDiv);
  }
}
try {
  console.log('inside content script');
  inject().catch(e => console.error(e));
} catch (e) {
  console.error('The mother fucking error is', e);
}
