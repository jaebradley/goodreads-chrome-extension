import createClient from '../../createClient';
import parseReviewResponse from './parseReviewResponse';

export default async function getSingleBookPageData({ jwt, isbn }) {
  const client = createClient({ jwt });
  const bookIdSearchResponse = await client.books.id.search({ isbn });
  const bookId = Number(bookIdSearchResponse.data.id);
  let bookReviewResponse;
  try {
    bookReviewResponse = await client.user.books.getReview(bookId);
  } catch (e) {
    if (!e || !e.response || e.response.status !== 404) {
      throw e;
    }
  }
  const bookReviewStatisticsResponse = await client.books.getReviewStatistics(isbn);
  const {
    average_rating: averageRating,
    work_text_reviews_count: reviewsCount,
  } = bookReviewStatisticsResponse.data;
  const bookReview = bookReviewResponse
    ? parseReviewResponse(bookReviewResponse.data.GoodreadsResponse.review)
    : null;

  return {
    bookId: Number(bookId),
    bookReview,
    bookReviewStatistics: {
      averageRating: Number(averageRating),
      reviewsCount: Number(reviewsCount),
    },
  };
}
