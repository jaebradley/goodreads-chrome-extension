import axios from 'axios';

const {
  GOODREADS_SERVER_BASE_URL,
} = process.env;

export default async function getAccessToken({ requestToken, requestTokenSecret }) {
  const response = await axios.post(
    `${GOODREADS_SERVER_BASE_URL}/api/authentication/access_token`,
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
