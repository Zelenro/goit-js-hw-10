import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

// афуціпфпрф
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error(error);
    });
}
