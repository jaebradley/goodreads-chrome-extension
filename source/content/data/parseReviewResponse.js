/* eslint no-underscore-dangle: 0 */

function parseAttributes(attributes) {
  return {
    id: Number(attributes.id),
    name: attributes.name,
  };
}

// handle single shelf (object)
// and multiple shelves (array)
function parseShelf(shelves) {
  if (Array.isArray(shelves)) {
    return shelves.map(shelf => parseAttributes(shelf._attributes));
  }

  return [parseAttributes(shelves._attributes)];
}

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
    shelves: parseShelf(review.shelves.shelf),
  };
}
