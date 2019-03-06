import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';
import GoodreadsLogo from './images/goodreads-logo.svg';

function App({
  bookId,
  isbn,
  bookReviewStatistics,
  bookReview,
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <GoodreadsLogo style={{ width: '20px', height: '20px', paddingRight: '4px' }} />
        <Review
          isbn={isbn}
          bookId={bookId}
          bookReviewStatistics={bookReviewStatistics}
        />
        &nbsp;
        {
          !!bookReview && (
            <span
              role="img"
              aria-label="checkmark"
            >
              ✅
            </span>
          )
        }
      </div>
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
