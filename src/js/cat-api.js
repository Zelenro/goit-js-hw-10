import axios from 'axios';

const API = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export const fetchBreeds = () => {
  return axios
    .get(`${API}/breeds`)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch breeds');
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`${API}/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error('Failed to fetch cat by breed');
    });
};
