import elementReady from 'element-ready';

export default async function identifyISBN13() {
  const isbnContainer = await elementReady('div[data-feature-name="printEditionIsbn"]');
  const isbnHeader = isbnContainer.querySelector('span[class="a-size-base a-color-base a-text-bold"]');
  return isbnHeader.nextElementSibling.textContent.trim().replace(/-/g, '');
}
