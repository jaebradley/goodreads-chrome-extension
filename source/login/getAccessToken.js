import axios from 'axios';

export default async function getAccessToken({ requestToken, requestTokenSecret }) {
  const response = await axios.post(
    'http://localhost:3000/api/authentication/access_token',
    {
      requestToken,
      requestTokenSecret,
    },
  );
  const {
    jwt,
  } = response.data;
  return jwt;
}
