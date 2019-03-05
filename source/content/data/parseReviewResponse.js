/* eslint no-underscore-dangle: 0 */

export default function parseReviewResponse(review) {
  return {
    id: Number(review.id._text),
    book: {
      id: Number(review.book.id._text),
      isbn: Number(review.book.isbn._text),
      isbn13: Number(review.book.isbn13._text),
      url: review.book.link._text,
    },
    dateAdded: new Date(review.date_added._text),
    startedAt: new Date(review.started_at._text),
    shelves: review.shelves.shelf.map(shelf => ({
      id: Number(shelf._attributes.id),
      name: shelf._attributes.name,
    })),
  };
}
