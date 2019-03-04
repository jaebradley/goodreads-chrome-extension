import React from 'react';
import ReactDOM from 'react-dom';

import domLoaded from 'dom-loaded';
import App from './App';
import identifyISBN13 from './identifyISBN13';
import getSingleBookPageData from './data/getSingleBookPageData';

async function inject() {
  await domLoaded;
  // Kindle Tab
  let element = document.getElementById('reviewFeatureGroup');
  if (!element) {
    // Hard Cover Tab
    element = document.getElementById('averageCustomerReviews');
  }


  if (element) {
    chrome.storage.sync.get(async (result) => {
      const {
        jwt,
      } = result;
      const isbn = await identifyISBN13();
      const {
        bookId,
        bookReviewResponse,
        bookReviewStatistics,
      } = await getSingleBookPageData({ jwt, isbn });

      const appDiv = document.createElement('div');
      appDiv.setAttribute('id', 'goodreads-extension');
      element.parentNode.insertBefore(appDiv, element.nextSibling);
      ReactDOM.render(
        <App
          bookId={bookId}
          bookReviewResponse={bookReviewResponse}
          bookReviewStatistics={bookReviewStatistics}
          isbn={isbn}
        />,
        appDiv,
      );
    });
  }
}
try {
  console.log('inside content script');
  inject().catch(e => console.error(e));
} catch (e) {
  console.error('The mother fucking error is', e);
}
