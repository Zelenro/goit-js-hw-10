// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// export function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.data)
//     .catch(error => {
//       throw new Error(error);
//     });
// }

// // афуціпфпрф
// export function fetchCatByBreed(breedId) {
//   const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
//   return axios
//     .get(url)
//     .then(response => response.data[0])
//     .catch(error => {
//       throw new Error(error);
//     });
// }

// // cat-api.js
// import axios from 'axios';

// // Налаштування заголовка для всіх запитів
// axios.defaults.headers.common['x-api-key'] =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// // Функція для отримання списку порід
// export function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.data)
//     .catch(error => {
//       throw new Error('Failed to fetch cat breeds');
//     });
// }

// // Функція для отримання інформації про кота за ідентифікатором породи
// export function fetchCatByBreed(breedId) {
//   const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
//   return axios
//     .get(url)
//     .then(response => response.data)
//     .catch(error => {
//       throw new Error('Failed to fetch cat information');
//     });
// }
// //

// ========
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch cat breeds');
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch cat information');
    });
}
