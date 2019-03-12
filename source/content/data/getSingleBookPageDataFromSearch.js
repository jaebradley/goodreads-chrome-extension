import createClient from '../../createClient';
import parseReviewResponse from './parseReviewResponse';

export default async function getSingleBookPageDataFromSearch({ jwt, title, author }) {
  const client = createClient({ jwt });
  const searchResponse = await client.books.search({ author, title });
  // eslint-disable-next-line no-underscore-dangle
  const bookId = Number(searchResponse.data.best_book.id._text);
  let bookReviewResponse;
  try {
    bookReviewResponse = await client.user.books.getReview(bookId);
  } catch (e) {
    if (!e || !e.response || e.response.status !== 404) {
      throw e;
    }
  }

  const bookReview = bookReviewResponse
    ? parseReviewResponse(bookReviewResponse.data.GoodreadsResponse.review)
    : null;

  return {
    bookId: Number(bookId),
    bookReview,
    bookReviewStatistics: {
      // eslint-disable-next-line no-underscore-dangle
      averageRating: Number(searchResponse.data.average_rating._text),
      // eslint-disable-next-line no-underscore-dangle
      reviewsCount: Number(searchResponse.data.text_reviews_count._text),
    },
  };
}
