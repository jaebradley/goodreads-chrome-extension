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
                .map((key) => {
                  const shelfName = ShelfNames[key];
                  return (
                    <Form.Radio
                      label={shelfName}
                      value={shelfName}
                      name="shelves"
                      onClick={() => chrome.runtime.sendMessage({ method: 'ADD_BOOK_TO_SHELF', data: { shelfName, bookId } })}
                    />
                  );
                })
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
