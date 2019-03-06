import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popup,
  Label,
  Icon,
  Form,
} from 'semantic-ui-react';

import ShelfNames from './data/constants/ShelfNames';

function Review({ bookId, bookReviewStatistics }) {
  return (
    <div>
      <Label>
        <Icon name="star" />
        { bookReviewStatistics.averageRating }
      </Label>
      <Label
        as="a"
        href={`https://www.goodreads.com/book/show/${bookId}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        { bookReviewStatistics.reviewsCount }
        &nbsp;
        reviews
        &nbsp;
        <Icon name="external alternate" />
      </Label>
      <Popup trigger={<Button icon="add" size="mini" />} flowing hoverable>
        <Form>
          <Form.Group grouped>
            {
              Object
                .keys(ShelfNames)
                .map(key => (
                  <Form.Field label={ShelfNames[key]} value={ShelfNames[key]} control="input" type="radio" name="htmlRadios" />
                ))
            }
          </Form.Group>
        </Form>
      </Popup>
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
