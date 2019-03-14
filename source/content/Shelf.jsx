import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Label,
} from 'semantic-ui-react';

import ShelfNames from './data/constants/ShelfNames';

function Shelf({ color, name, bookId }) {
  const onClick = useCallback(
    () => chrome.runtime.sendMessage({
      method: 'REMOVE_BOOK_FROM_SHELF',
      data: {
        shelfName: name,
        bookId,
      },
    }),
  );
  return (
    <Label tag color={color}>
      <Icon name="book" />
      { name }
      {
        // Read shelf cannot be removed
        name !== ShelfNames.READ
          && <Icon name="delete" onClick={onClick} />
      }
    </Label>
  );
}

Shelf.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bookId: PropTypes.number.isRequired,
};

export default Shelf;
