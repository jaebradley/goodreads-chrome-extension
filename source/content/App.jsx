import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';
import GoodreadsLogo from './images/goodreads-logo.svg';

function App({ bookId, isbn, bookReviewStatistics }) {
  return (
    <div>
      {
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <GoodreadsLogo style={{ width: '20px', height: '20px', paddingRight: '4px' }} />
          <Review
            isbn={isbn}
            bookId={bookId}
            bookReviewStatistics={bookReviewStatistics}
          />
        </div>
      }
    </div>
  );
}

App.propTypes = {
  bookId: PropTypes.string.isRequired,
  isbn: PropTypes.number.isRequired,
  bookReviewStatistics: PropTypes.shape({
    averageRating: PropTypes.number,
    reviewsCount: PropTypes.number,
  }).isRequired,
};

export default App;
