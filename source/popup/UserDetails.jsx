import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const {
  GOODREADS_SERVER_BASE_URL,
} = process.env;

function useEffectAsync(effect, inputs) {
  useEffect(() => { effect(); }, inputs);
}

function UserDetails({ jwt }) {
  const [
    data,
    setData,
  ] = useState({ name: '' });

  async function fetchData() {
    // TODO: @jaebradley add error handling and a loader
    if (jwt) {
      const result = await axios.get(
        `${GOODREADS_SERVER_BASE_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      setData({ name: result.data.user.name });
    }
  }

  useEffectAsync(fetchData, [jwt]);

  return (
    <div>
      { data.name }
      &nbsp;
      is logged in!
    </div>
  );
}

UserDetails.propTypes = {
  jwt: PropTypes.string.isRequired,
};

export default UserDetails;
