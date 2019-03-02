import axios from 'axios';

const {
  GOODREADS_SERVER_BASE_URL,
} = process.env;

export default async function getRequestToken() {
  const response = await axios.post(`${GOODREADS_SERVER_BASE_URL}/api/authentication/request_token`);
  const {
    token,
    secret,
  } = response.data;
  return {
    token,
    secret,
  };
}
