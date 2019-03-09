import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Popup,
  Form,
} from 'semantic-ui-react';

import ShelfNames from './data/constants/ShelfNames';

function AddShelvesButton({ bookId }) {
  return (
    <Popup trigger={<Button icon={<Icon name="add" />} size="mini" compact />} flowing hoverable>
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
  );
}

AddShelvesButton.propTypes = {
  bookId: PropTypes.number.isRequired,
};

export default AddShelvesButton;
