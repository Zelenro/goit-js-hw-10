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

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  breedSelect.insertAdjacentElement('afterend', loader);

  breedSelect.style.display = 'none';
  error.style.display = 'none';
  catInfo.innerHTML = '';

  fetchBreeds()
    .then(breeds => {
      loader.style.display = 'none';
      breedSelect.style.display = 'block';

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      // Ініціалізація SlimSelect на вашому селекті
      new SlimSelect({
        select: breedSelect,
      });
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    loader.style.display = 'block';
    catInfo.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        loader.style.display = 'none';

        const image = document.createElement('img');
        image.src = cat.url;

        const breedName = document.createElement('h2');
        breedName.textContent = cat.breeds[0].name;

        const description = document.createElement('p');
        description.textContent = cat.breeds[0].description;

        const temperament = document.createElement('p');
        temperament.textContent = cat.breeds[0].temperament;

        catInfo.appendChild(image);
        catInfo.appendChild(breedName);
        catInfo.appendChild(description);
        catInfo.appendChild(temperament);
      })
      .catch(() => {
        loader.style.display = 'none';
        error.style.display = 'block';
      });
  });
});
