import React from 'react';

export default function Login() {
  return (
    <div>
      It does not look like you've successfully authenticated this application - please click <button onClick={() => chrome.runtime.sendMessage({ method: 'login' })}>here</button> to authenticate
    </div>
  )
}
