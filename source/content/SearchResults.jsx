import 'semantic-ui-css/semantic.min.css';

import browser from 'webextension-polyfill';
import React, {
  Fragment,
  useCallback,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Loader,
} from 'semantic-ui-react';
import Review from './Review';
import Shelves from './Shelves';
import AddShelvesButton from './AddShelvesButton';

function SearchResults({ node }) {
  const [
    bookId,
    setBookId,
  ] = useState(null);

  const [
    bookReviewStatistics,
    setBookReviewStatistics,
  ] = useState(null);

  const [
    bookReview,
    setBookReview,
  ] = useState(null);

  const [
    clicked,
    setClicked,
  ] = useState(false);

  const onClick = useCallback(() => {
    setClicked(true);
    // eslint-disable-next-line react/no-find-dom-node
    const currentElement = node;
    if (currentElement) {
      const wrapperElement = currentElement.closest('div[class="sg-col-inner"]');
      const title = wrapperElement.querySelector('h5.a-color-base').innerText.trim();
      const author = wrapperElement.querySelector('a.a-size-base').innerText.trim();
      if (title && author) {
        const port = browser.runtime.connect({ name: 'BOOK_PAGE_DATA_FROM_SEARCH' });
        port.postMessage({ title, author });
        port.onMessage.addListener((message) => {
          const {
            bookId: BookId,
            bookReview: BookReview,
            bookReviewStatistics: BookReviewStatistics,
          } = message;
          setBookId(BookId);
          setBookReviewStatistics(BookReviewStatistics);
          setBookReview(BookReview);
        });
      }
    }
  });

  const hasData = bookId && bookReviewStatistics;
  const hasShelves = bookReview && bookReview.shelves;

  const currentShelfNames = hasShelves ? bookReview.shelves.map(shelf => shelf.name) : [];

  return (
    <Fragment>
      <Icon name="goodreads" size="big" onClick={onClick} />
      {
        hasData
          && clicked
          && (
            <React.Fragment>
              <AddShelvesButton
                bookId={bookId}
                currentShelfNames={currentShelfNames}
                onAddClick={setBookReview}
              />
              <Review
                bookId={bookId}
                bookReviewStatistics={bookReviewStatistics}
              />
              { hasShelves
                && (
                <Shelves
                  shelves={bookReview.shelves}
                  bookId={bookId}
                  onDeleteClick={setBookReview}
                />
                )
              }
            </React.Fragment>
          )
      }
      {
        !hasData && clicked
          && (
            <Loader size="mini" active inline />
          )
      }
    </Fragment>
  );
}

SearchResults.propTypes = {
  node: PropTypes.node.isRequired,
};

export default SearchResults;
