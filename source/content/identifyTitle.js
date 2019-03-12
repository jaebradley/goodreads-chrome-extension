export default function identifyTitle() {
  const titleElement = document.getElementById('ebooksProductTitle');
  if (titleElement) {
    return titleElement.innerText;
  }

  return null;
}
