import React from 'react';
import Ratings from 'react-ratings-declarative';
import PropTypes from 'prop-types';

function Review({ bookId, bookReviewStatistics }) {
  return (
    <div>
      <Ratings
        widgetRatedColors="#fb0"
        rating={bookReviewStatistics.averageRating}
        widgetDimensions="16px"
        widgetSpacings="0px"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      &nbsp;
      <span>
        { `(${bookReviewStatistics.averageRating})` }
      </span>
      &nbsp;
      <a
        href={`https://www.goodreads.com/book/show/${bookId}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span>
          { bookReviewStatistics.reviewsCount }
          &nbsp;
          reviews
        </span>
      </a>
    </div>
  );
}

Review.propTypes = {
  bookId: PropTypes.number.isRequired,
  bookReviewStatistics: PropTypes.shape({
    averageRating: PropTypes.number,
    reviewsCount: PropTypes.number,
  }).isRequired,
};

export default Review;
