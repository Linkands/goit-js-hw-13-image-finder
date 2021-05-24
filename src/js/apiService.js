const API_KEY = '21748955-40ae248ad9ce65df002076b41';
const baseURL = 'https://pixabay.com/api/';

function fetchPictures(pictureName, pageNumber) {
  const url = `${baseURL}?image_type=photo&orientation=horizontal&q=${pictureName}&page=${pageNumber}&per_page=12&key=${API_KEY}`;

  return fetch(url).then(response => response.json());
}

export { fetchPictures };
