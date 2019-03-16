import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Label,
} from 'semantic-ui-react';

import ShelfNames from './data/constants/ShelfNames';
import deleteBookFromShelf from './hooks/deleteBookFromShelf';

function Shelf({
  color,
  name,
  bookId,
  onDeleteClick,
}) {
  const onClick = deleteBookFromShelf({ name, bookId, onDelete: onDeleteClick });

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
  onDeleteClick: PropTypes.func.isRequired,
};

export default Shelf;
