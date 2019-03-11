import axios from 'axios';

const {
  GOODREADS_SERVER_BASE_URL,
} = process.env;

export default function createClient({ jwt }) {
  const instance = axios.create({
    baseURL: `${GOODREADS_SERVER_BASE_URL}/api/`,
    headers: {
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
    },
  });

  return {
    authentication: {
      createAccessToken: ({ requestToken, requestTokenSecret }) => instance.post('/authentication/access_token', { requestToken, requestTokenSecret }),
      createRequestToken: () => instance.post('/authentication/request_token'),
    },
    books: {
      id: {
        search: ({ isbn }) => instance.get('/books/id/search', { params: { isbn } }),
      },
      getReviewStatistics: isbn => instance.get('/book/review_statistics', { params: { isbn } }),
      search: ({ title, author }) => instance.get('/book/search', { params: { title, author } }),
    },
    user: {
      getDetails: () => instance.get('/user'),
      books: {
        getReview: bookId => instance.get(`/user/books/${bookId}/review`),
      },
      shelves: {
        addBook: ({ shelfName, bookId }) => instance.post(`/user/shelves/${shelfName}/books`, { bookId }),
      },
    },
  };
}
