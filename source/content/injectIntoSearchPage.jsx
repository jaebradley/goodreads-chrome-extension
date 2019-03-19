import React from 'react';
import ReactDOM from 'react-dom';

import SearchResults from './SearchResults';

export default function injectIntoSearchPage() {
  // Find all ratings elements
  // Inject goodreads search results below them
  const ratingsElements = Array.from(document.querySelectorAll('.sg-col-inner > .a-section.a-spacing-none.a-spacing-top-micro > .a-row.a-size-small'));
  if (ratingsElements.length > 0) {
    ratingsElements.forEach((element, index) => {
      const appDiv = document.createElement('div');
      appDiv.setAttribute('id', `goodreads-extension-${index}`);
      element.parentNode.insertBefore(appDiv, element.nextSibling);
      ReactDOM.render(<SearchResults />, appDiv);
    });
  }
}
