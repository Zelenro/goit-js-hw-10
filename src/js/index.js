// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// const instance = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1/breeds',
// });

// axios.get('https://api.thecatapi.com/v1/breeds').then(function (response) {
//   console.log(response.data.map(el => el.id));
//   console.log(response.status);
//   console.log(response.statusText);
//   console.log(response.headers);
//   console.log(response.config);
// });

// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';

// document.addEventListener('DOMContentLoaded', () => {
//   const breedSelect = document.querySelector('.breed-select');
//   const loader = document.createElement('div');
//   loader.classList.add('loader');
//   const error = document.querySelector('.error');
//   const catInfo = document.querySelector('.cat-info');

//   breedSelect.insertAdjacentElement('afterend', loader);

//   breedSelect.style.display = 'none';
//   error.style.display = 'none';
//   catInfo.innerHTML = '';

//   fetchBreeds()
//     .then(breeds => {
//       loader.style.display = 'none';
//       breedSelect.style.display = 'block';

//       breeds.forEach(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.textContent = breed.name;
//         breedSelect.appendChild(option);
//       });

//       // Ініціалізація SlimSelect на вашому селекті

//       new SlimSelect({
//         select: breedSelect,
//       });
//     })
//     .catch(() => {
//       loader.style.display = 'none';
//       error.style.display = 'block';
//     });

//   breedSelect.addEventListener('change', () => {
//     const selectedBreedId = breedSelect.value;
//     loader.style.display = 'block';
//     catInfo.innerHTML = '';

//     fetchCatByBreed(selectedBreedId)
//       .then(cat => {
//         loader.style.display = 'none';

//         const image = document.createElement('img');
//         image.src = cat.url;

//         const breedName = document.createElement('h2');
//         breedName.textContent = cat.breeds[0].name;

//         const description = document.createElement('p');
//         description.textContent = cat.breeds[0].description;

//         const temperament = document.createElement('p');
//         temperament.textContent = cat.breeds[0].temperament;

//         catInfo.appendChild(image);
//         catInfo.appendChild(breedName);
//         catInfo.appendChild(description);
//         catInfo.appendChild(temperament);
//       })
//       .catch(() => {
//         loader.style.display = 'none';
//         error.style.display = 'block';
//       });
//   });
// });

// // app.js
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';
// import * as Notiflix from 'notiflix';

// const breedSelect = new SlimSelect({
//   select: '.breed-select',
//   placeholder: 'Select a breed',
//   onChange: info => {
//     const breedId = info.value();
//     fetchCatInfo(breedId);
//   },
// });

// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// function fetchCatBreeds() {
//   breedSelect.disable();
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchBreeds()
//     .then(breeds => {
//       populateBreedsSelect(breeds);
//       breedSelect.enable();
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function populateBreedsSelect(breeds) {
//   breedSelect.setData(
//     breeds.map(breed => ({ value: breed.id, text: breed.name }))
//   );
// }

// function fetchCatInfo(breedId) {
//   catInfo.style.display = 'none';
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchCatByBreed(breedId)
//     .then(cat => {
//       displayCatInfo(cat);
//       catInfo.style.display = 'block';
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function displayCatInfo(cat) {
//   const image = document.createElement('img');
//   image.src = cat[0].url;

//   const name = document.createElement('h2');
//   name.textContent = cat[0].breeds[0].name;

//   const description = document.createElement('p');
//   description.textContent = cat[0].breeds[0].description;

//   const temperament = document.createElement('p');
//   temperament.textContent = 'Temperament: ' + cat[0].breeds[0].temperament;

//   catInfo.innerHTML = '';
//   catInfo.appendChild(image);
//   catInfo.appendChild(name);
//   catInfo.appendChild(description);
//   catInfo.appendChild(temperament);
// }

// function showError() {
//   error.style.display = 'block';
//   Notiflix.Notify.failure(
//     'Oops! Something went wrong. Try reloading the page!'
//   );
// }

// fetchCatBreeds();

// ++++++++++++++++++++++++++++++++++++++++++++

// // app.js
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';
// import * as Notiflix from 'notiflix';

// const breedSelect = new SlimSelect({
//   select: '.breed-select',
//   placeholder: 'Select a breed',
//   onChange: info => {
//     const breedId = info.value();
//     fetchCatInfo(breedId);
//   },
// });

// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// function fetchCatBreeds() {
//   breedSelect.disable();
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchBreeds()
//     .then(breeds => {
//       populateBreedsSelect(breeds);
//       breedSelect.enable();
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function populateBreedsSelect(breeds) {
//   breedSelect.setData(
//     breeds.map(breed => ({ value: breed.id, text: breed.name }))
//   );
// }

// function fetchCatInfo(breedId) {
//   catInfo.style.display = 'none';
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchCatByBreed(breedId)
//     .then(cat => {
//       displayCatInfo(cat);
//       catInfo.style.display = 'block';
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function displayCatInfo(cat) {
//   const image = document.createElement('img');
//   image.src = cat[0].url;

//   const name = document.createElement('h2');
//   name.textContent = cat[0].breeds[0].name;

//   const description = document.createElement('p');
//   description.textContent = cat[0].breeds[0].description;

//   const temperament = document.createElement('p');
//   temperament.textContent = 'Temperament: ' + cat[0].breeds[0].temperament;

//   catInfo.innerHTML = '';
//   catInfo.appendChild(image);
//   catInfo.appendChild(name);
//   catInfo.appendChild(description);
//   catInfo.appendChild(temperament);
// }

// function showError() {
//   error.style.display = 'block';
//   Notiflix.Notify.failure(
//     'Oops! Something went wrong. Try reloading the page!'
//   );
// }

// // Вызов функции для загрузки списка пород
// fetchCatBreeds();

// ++++++++++++++++++++++++++++++++

// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import * as Notiflix from 'notiflix';

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// breedSelect.addEventListener('change', () => {
//   const selectedBreedId = breedSelect.value;
//   fetchCatInfo(selectedBreedId);
// });

// function fetchCatBreeds() {
//   breedSelect.disabled = true;
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchBreeds()
//     .then(breeds => {
//       populateBreedsSelect(breeds);
//       breedSelect.disabled = false;
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function populateBreedsSelect(breeds) {
//   breeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     breedSelect.appendChild(option);
//   });
// }

// function fetchCatInfo(breedId) {
//   catInfo.style.display = 'none';
//   loader.style.display = 'block';
//   error.style.display = 'none';

//   fetchCatByBreed(breedId)
//     .then(cat => {
//       displayCatInfo(cat);
//       catInfo.style.display = 'block';
//       loader.style.display = 'none';
//     })
//     .catch(() => {
//       showError();
//       loader.style.display = 'none';
//     });
// }

// function displayCatInfo(cat) {
//   const image = document.createElement('img');
//   image.src = cat[0].url;
//   image.width = 300;
//   image.height = 200;

//   const name = document.createElement('h2');
//   name.textContent = cat[0].breeds[0].name;

//   const description = document.createElement('p');
//   description.textContent = cat[0].breeds[0].description;

//   const temperament = document.createElement('p');
//   temperament.textContent = 'Temperament: ' + cat[0].breeds[0].temperament;

//   catInfo.innerHTML = '';
//   catInfo.appendChild(image);
//   catInfo.appendChild(name);
//   catInfo.appendChild(description);
//   catInfo.appendChild(temperament);
// }

// function showError() {
//   error.style.display = 'block';
//   Notiflix.Notify.failure(
//     'Oops! Something went wrong. Try reloading the page!'
//   );
// }

// fetchCatBreeds();

// +++++++++++++++++++++++++++++++++++++++++++++++++++

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import * as Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const slimselect = new SlimSelect({
  select: '.breed-select',
  onChange: info => {
    const selectedBreedId = info.value();
    fetchCatInfo(selectedBreedId);
  },
});

function fetchCatBreeds() {
  slimselect.disable();
  loader.style.display = 'block';
  error.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      populateBreedsSelect(breeds);
      slimselect.enable();
      loader.style.display = 'none';
    })
    .catch(() => {
      showError();
      loader.style.display = 'none';
    });
}

function populateBreedsSelect(breeds) {
  slimselect.setData(
    breeds.map(breed => ({ value: breed.id, text: breed.name }))
  );
}

function fetchCatInfo(breedId) {
  catInfo.style.display = 'none';
  loader.style.display = 'block';
  error.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      catInfo.style.display = 'block';
      loader.style.display = 'none';
    })
    .catch(() => {
      showError();
      loader.style.display = 'none';
    });
}

function displayCatInfo(cat) {
  const image = document.createElement('img');
  image.src = cat[0].url;
  image.width = 300;
  image.height = 200;

  const name = document.createElement('h2');
  name.textContent = cat[0].breeds[0].name;

  const description = document.createElement('p');
  description.textContent = cat[0].breeds[0].description;

  const temperament = document.createElement('p');
  temperament.textContent = 'Temperament: ' + cat[0].breeds[0].temperament;

  catInfo.innerHTML = '';
  catInfo.appendChild(image);
  catInfo.appendChild(name);
  catInfo.appendChild(description);
  catInfo.appendChild(temperament);
}

function showError() {
  error.style.display = 'block';
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Try reloading the page!'
  );
}

fetchCatBreeds();
