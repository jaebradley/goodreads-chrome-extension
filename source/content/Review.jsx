import React, { useState } from 'react';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';
import PropTypes from 'prop-types';

import useAsyncEffect from '../utilities/useAsyncEffect';

const {
  GOODREADS_SERVER_BASE_URL,
} = process.env;

function Review({ isbn, jwt }) {
  const [
    reviewStatistics,
    setReviewStatistics,
  ] = useState({ averageRating: 0, reviewsCount: 0 });

  async function fetchRating() {
    // TODO: @jaebradley add error handling and a loader
    if (jwt && isbn) {
      const result = await axios.get(
        `${GOODREADS_SERVER_BASE_URL}/api/book/review_statistics`,
        {
          params: { isbn },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      setReviewStatistics({
        averageRating: result.data.average_rating,
        reviewsCount: result.data.text_reviews_count,
      });
    }
  }

  useAsyncEffect(fetchRating, [isbn, jwt]);

  return (
    <div>
      <Ratings
        widgetRatedColors="#fb0"
        rating={Number(reviewStatistics.averageRating)}
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
        { `${(reviewStatistics.averageRating)}` }
      </span>
      &nbsp;
      <span>
        { reviewStatistics.reviewsCount }
        &nbsp;
        reviews
      </span>
    </div>
  );
}

Review.propTypes = {
  isbn: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
};

export default Review;
