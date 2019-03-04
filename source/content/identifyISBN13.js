export default async function identifyISBN13() {
  // Kindle Tab
  let isbnContainer = document.querySelector('div[data-feature-name="printEditionIsbn"]');
  if (!isbnContainer) {
    // Hard Cover Tab
    isbnContainer = document.querySelector('div[data-feature-name="isbn"]');
  }
  // TODO: @jaebradley handle productDetailsTable
  const isbnHeader = isbnContainer.querySelector('span[class="a-size-base a-color-base a-text-bold"]');
  return isbnHeader.nextElementSibling.textContent.trim().replace(/-/g, '');
}
