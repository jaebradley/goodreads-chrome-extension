import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import Login from './Login';

export default function App() {
  const [
    jwt,
    setJWT,
  ] = useState('');

  useEffect(() => chrome.storage.sync.get(result => setJWT(result.jwt)));

  return (
    <div>
      { !jwt && <Login /> }
      { !!jwt && <UserDetails jwt={jwt} /> }
    </div>
  );
}
