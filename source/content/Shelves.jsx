import React from 'react';

import PropTypes from 'prop-types';
import {
  Icon,
  Label,
} from 'semantic-ui-react';

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

function Shelves({ shelves }) {
  return (
    <Label.Group tag>
      {
        shelves.map((shelf, index) => {
          const colorIndex = index % COLORS.length;
          return (
            <Label tag color={COLORS[colorIndex]}>
              <Icon name="book" />
              { shelf.name }
              <Icon name="delete" />
            </Label>
          );
        })
      }
    </Label.Group>
  );
}

Shelves.propTypes = {
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Shelves;
