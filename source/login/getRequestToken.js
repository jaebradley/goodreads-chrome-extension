import axios from 'axios';

export default async function getRequestToken() {
  const response = await axios.post('http://localhost:3000/api/authentication/request_token');
  const {
    token,
    secret,
  } = response.data;
  return {
    token,
    secret,
  };
}
