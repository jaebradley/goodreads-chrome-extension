import React from 'react';
import ReactDOM from 'react-dom';

import elementReady from 'element-ready';
import App from './App';

async function inject() {
  const element = await elementReady('#reviewFeatureGroup');
  console.log('I got the element!', element);

  if (element) {
    const appDiv = document.createElement('div');
    appDiv.setAttribute('id', 'goodreads-extension');
    element.appendChild(appDiv);
    ReactDOM.render(<App />, appDiv);
  }
}
try {
  console.log('inside content script');
  inject().catch(e => console.error(e));
} catch (e) {
  console.error(e);
}
