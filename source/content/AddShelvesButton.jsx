import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Popup,
  Form,
} from 'semantic-ui-react';

import ShelfNames from './data/constants/ShelfNames';
import addBookToShelf from './hooks/addBookToShelf';

function AddShelvesButton({ bookId, currentShelfNames, onAddClick }) {
  return (
    <Popup trigger={<Button icon={<Icon name="add" />} size="mini" compact />} flowing hoverable>
      <Form>
        <Form.Group grouped>
          {
              Object
                .keys(ShelfNames)
                .map((key) => {
                  const shelfName = ShelfNames[key];
                  const onClick = addBookToShelf({ shelfName, bookId, onAdd: onAddClick });
                  return (
                    <Form.Radio
                      label={shelfName}
                      value={shelfName}
                      name="shelves"
                      checked={currentShelfNames.includes(shelfName)}
                      onClick={onClick}
                    />
                  );
                })
            }
        </Form.Group>
      </Form>
    </Popup>
  );
}

AddShelvesButton.propTypes = {
  bookId: PropTypes.number.isRequired,
  currentShelfNames: PropTypes.arrayOf(PropTypes.string),
};

AddShelvesButton.defaultProps = {
  currentShelfNames: [],
};

export default AddShelvesButton;
