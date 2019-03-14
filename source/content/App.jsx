import 'semantic-ui-css/semantic.min.css';

import browser from 'webextension-polyfill';

import React, { useState } from 'react';

import {
  Icon,
  Loader,
} from 'semantic-ui-react';

import Review from './Review';
import Shelves from './Shelves';
import AddShelvesButton from './AddShelvesButton';
import useAsyncEffect from '../utilities/useAsyncEffect';
import identifyAuthor from './identifyAuthor';
import identifyISBN13 from './identifyISBN13';
import identifyTitle from './identifyTitle';

export default function App() {
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

  useAsyncEffect(async () => {
    const isbn = await identifyISBN13();
    if (isbn) {
      const port = browser.runtime.connect({ name: 'BOOK_PAGE_DATA' });
      port.postMessage({ isbn });
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
    } else {
      const title = identifyTitle();
      const author = identifyAuthor();

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
  }, []);

  const hasData = bookId && bookReviewStatistics;
  const hasShelves = bookReview && bookReview.shelves;

  const currentShelfNames = hasShelves ? bookReview.shelves.map(shelf => shelf.name) : [];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="goodreads" size="big" />
      {
        hasData
          && (
            <React.Fragment>
              <AddShelvesButton bookId={bookId} currentShelfNames={currentShelfNames} />
              <Review
                bookId={bookId}
                bookReviewStatistics={bookReviewStatistics}
              />
              { hasShelves && <Shelves shelves={bookReview.shelves} /> }
            </React.Fragment>
          )
      }
      {
        !hasData
          && (
            <Loader size="mini" active inline />
          )
      }
    </div>
  );
}
