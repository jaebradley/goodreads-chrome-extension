import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
} from 'semantic-ui-react';

import Review from './Review';
import Shelves from './Shelves';
import AddShelvesButton from './AddShelvesButton';

function App({
  bookId,
  isbn,
  bookReviewStatistics,
  bookReview,
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="goodreads" size="big" />
      <AddShelvesButton bookId={bookId} />
      <Review
        isbn={isbn}
        bookId={bookId}
        bookReviewStatistics={bookReviewStatistics}
      />
      {
        bookReview
          && bookReview.shelves
          && <Shelves shelves={bookReview.shelves} />
      }
    </div>
  );
}

App.propTypes = {
  bookId: PropTypes.number.isRequired,
  bookReview: PropTypes.shape({
    id: PropTypes.number.isRequired,
    book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isbn: PropTypes.number.isRequired,
      isbn13: PropTypes.number.isRequired,
    }).isRequired,
    dateAdded: PropTypes.instanceOf(Date).isRequired,
    startedAt: PropTypes.instanceOf(Date),
    shelves: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
  isbn: PropTypes.number.isRequired,
  bookReviewStatistics: PropTypes.shape({
    averageRating: PropTypes.number,
    reviewsCount: PropTypes.number,
  }).isRequired,
};

App.defaultProps = {
  bookReview: null,
};

export default App;
