export default function identifyAuthor() {
  const authorElement = document.querySelector('.contributorNameID');
  if (authorElement) {
    return authorElement.innerText;
  }

  return null;
}
