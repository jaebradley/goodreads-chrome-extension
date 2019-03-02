import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import identifyISBN13 from '../content/identifyISBN13';
import useAsyncEffect from '../utilities/useAsyncEffect';

import Review from './Review';
import GoodreadsLogo from './images/goodreads-logo.svg';

export default function App() {
  const [
    jwt,
    setJWT,
  ] = useState('');
  const [
    isbn,
    setISBN,
  ] = useState('');

  async function identifyISBN() {
    const isbn = await identifyISBN13();
    setISBN(isbn);
  }

  useEffect(() => chrome.storage.sync.get(result => setJWT(result.jwt)));
  useAsyncEffect(identifyISBN, []);

  return (
    <div>
      {
        isbn && jwt && (
          <React.Fragment>
            <GoodreadsLogo style={{ width: '20px', height: '20px' }} />
            <Review isbn={isbn} jwt={jwt} />
          </React.Fragment>
        )
      }
    </div>
  )
}
