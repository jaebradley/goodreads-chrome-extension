import React, { useCallback } from 'react';

export default function Login() {
  const handleOnClick = useCallback(() => chrome.runtime.sendMessage({ method: 'login' }));
  return (
    <div>
      It does not look like you've successfully authenticated this application - please click
      &nbsp;
      <button
        type="submit"
        onClick={handleOnClick}
      >
        here
      </button>
      &nbps;
      to authenticate
    </div>
  );
}
