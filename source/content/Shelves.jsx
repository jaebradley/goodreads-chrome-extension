import React from 'react';

import PropTypes from 'prop-types';
import {
  Label,
} from 'semantic-ui-react';

import Shelf from './Shelf';

// TODO: @jaebradley consider assigning custom colors for fixed shelves
const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];

function Shelves({ shelves, bookId }) {
  return (
    <Label.Group tag size="mini">
      {
        shelves.map((shelf, index) => {
          const colorIndex = index % COLORS.length;
          const color = COLORS[colorIndex];
          return (
            <Shelf
              bookId={bookId}
              color={color}
              name={shelf.name}
            />
          );
        })
      }
    </Label.Group>
  );
}

Shelves.propTypes = {
  bookId: PropTypes.number.isRequired,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Shelves;
