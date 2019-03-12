export default async function identifyISBN13() {
  // Kindle Tab
  let isbnContainer = document.querySelector('div[data-feature-name="printEditionIsbn"]');
  if (!isbnContainer) {
    // Hard Cover Tab
    isbnContainer = document.querySelector('div[data-feature-name="isbn"]');
  }

  if (isbnContainer) {
    // TODO: @jaebradley handle productDetailsTable
    const isbnHeader = isbnContainer.querySelector('span[class="a-size-base a-color-base a-text-bold"]');
    return isbnHeader.nextElementSibling.textContent.trim().replace(/-/g, '');
  }

  const productDetailsTable = document.getElementById('productDetailsTable');
  if (productDetailsTable) {
    const rows = productDetailsTable.querySelectorAll('div[class="content"] > ul > li');
    if (rows) {
      const isbn13Row = Array.from(rows).find(row => row.innerText.startsWith('ISBN-13:'));
      if (isbn13Row) {
        return isbn13Row.innerText.replace(new RegExp('^ISBN-13: '), '').replace('-', '').trim();
      }
      const isbnRow = Array.from(rows).find(row => row.innerText.startsWith('Page Numbers Source ISBN:'));
      if (isbnRow) {
        return isbnRow.innerText.replace(new RegExp('^Page Numbers Source ISBN: '), '').replace('-', '').trim();
      }
    }
  }

  return null;
}
