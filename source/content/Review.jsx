import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Icon,
} from 'semantic-ui-react';

function Review({ bookId, bookReviewStatistics }) {
  return (
    <React.Fragment>
      <Label size="mini">
        <Icon name="star" />
        { bookReviewStatistics.averageRating }
      </Label>
      <Label
        as="a"
        href={`https://www.goodreads.com/book/show/${bookId}`}
        rel="noopener noreferrer"
        target="_blank"
        size="mini"
      >
        { bookReviewStatistics.reviewsCount }
        &nbsp;
        reviews
        &nbsp;
        <Icon name="external alternate" />
      </Label>
    </React.Fragment>
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
