import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useEffectAsync(effect, inputs) {
  useEffect(() => { effect(); }, inputs);
}

export default function UserDetails({ jwt }) {
  const [
    data,
    setData,
  ] = useState({ name: '' });

  async function fetchData() {
    // TODO: @jaebradley add error handling and a loader
    if (jwt) {
      const result = await axios.get(
        'http://localhost:3000/api/user',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      setData({ name: result.data.user.name });
    }
  };

  useEffectAsync(fetchData, [jwt]);

  return (
    <div>
      { data.name } is logged in!
    </div>
  );
}
