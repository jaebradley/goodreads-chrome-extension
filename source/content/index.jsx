import React from 'react';
import ReactDOM from 'react-dom';

import domLoaded from 'dom-loaded';

import App from './App';

const VALID_CATEGORIES = [
  'books',
  'digital-text',
];

async function inject() {
  await domLoaded;

  // Check category DOM element and ensure it's book or kindle category
  const categoryElement = document.getElementById('nav-subnav');
  if (categoryElement) {
    if (VALID_CATEGORIES.includes(categoryElement.getAttribute('data-category'))) {
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
  }
}
try {
  console.log('inside content script');
  inject().catch(e => console.error(e));
} catch (e) {
  console.error('The mother fucking error is', e);
}
