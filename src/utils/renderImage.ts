const imgUrl = require('../assets/avatar.svg').default;

const imgElement = document.querySelector('img');
if (imgElement) {
  imgElement.src = imgUrl;
}
