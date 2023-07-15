import { fetchBreeds, fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/src/css/slimselect.css';

import axios from 'axios';

const API = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${API}/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${API}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.innerHTML = `<span class="loader"></span>`;
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const displayCatInfo = catData => {
  const { url } = catData;
  const { name, description, temperament } = catData.breeds[0];

  catInfo.innerHTML = `
    <img src="${url}" alt="cat ${name}" width="480">
    <h2 style="max-width: 480px">${name}</h2>
    <p style="max-width: 480px">${description}</p>
    <p style="max-width: 480px">Temperament: ${temperament}</p>
  `;

  catInfo.style.paddingTop = '25px';
};

const showError = errorMessage => {
  error.textContent = errorMessage;
  error.style.display = 'block';
};

const hideError = () => {
  error.style.display = 'none';
};

showLoader();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      optionElement.value = breed.id;
      optionElement.textContent = breed.name;
      breedSelect.appendChild(optionElement);
    });

    breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;
      showLoader();

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          displayCatInfo(catData[0]);
          hideLoader();
        })
        .catch(error => {
          hideLoader();
          showError(error);
        });
    });

    hideLoader();
    hideError();
  })
  .catch(error => {
    hideLoader();
    showError('Error loading breeds. Please try again.');
  });

// ============================================================

// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import '/src/css/slimselect.css';

// const API = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

// const breedSelectElement = document.querySelector('.breed-select');
// const catInfoElement = document.querySelector('.cat-info');
// const loaderElement = document.querySelector('.loader');
// const errorElement = document.querySelector('.error');

// hideElement(errorElement);
// hideElement(breedSelectElement);

// function getValueToSelect(data) {
//   const catsInfo = data
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join(' ');

//   console.log(data);

//   breedSelectElement.insertAdjacentHTML('beforeend', catsInfo);
//   new SlimSelect({ select: breedSelectElement });
// }

// let slimSelect;

// fetchBreeds()
//   .then(data => {
//     getValueToSelect(data);

//     hideElement(loaderElement);

//     slimSelect = new SlimSelect({
//       select: breedSelectElement,
//       placeholder: 'Select a breed',
//       onChange: handleSelectChange, // Assign the handleSelectChange function as the onChange callback
//     });

//     showElement(breedSelectElement);
//   })
//   .catch(error => {
//     hideElement(loaderElement);
//     hideElement(breedSelectElement);
//     Notiflix.Report.failure('Error', `${error}`);
//   });

// function handleSelectChange() {
//   const selectedOption = slimSelect.selected();
//   if (!selectedOption) return;

//   // hideElement(catInfoElement);

//   const breedId = selectedOption.value;

//   showLoader(loaderElement);

//   fetchCatByBreed(breedId)
//     .then(data => {
//       const cat = data[0];
//       const { url, breeds } = cat;
//       const { description, name, temperament } = breeds[0];

//       const image = document.createElement('img');
//       image.src = url;
//       image.alt = 'Cat';
//       image.width = 480;

//       const catNameElement = document.createElement('h2');
//       catNameElement.classList.add('cat-name');
//       catNameElement.style.maxWidth = '480px';
//       catNameElement.textContent = name;

//       const catDescriptionElement = document.createElement('p');
//       catDescriptionElement.classList.add('cat-description');
//       catDescriptionElement.style.maxWidth = '480px';
//       catDescriptionElement.textContent = description;

//       const temperamentElement = document.createElement('p');
//       temperamentElement.classList.add('cat-temperament');
//       temperamentElement.style.maxWidth = '480px';
//       temperamentElement.innerHTML = `<strong>Temperament:</strong> ${temperament}`;

//       catInfoElement.innerHTML = '';
//       catInfoElement.appendChild(image);
//       catInfoElement.appendChild(catNameElement);
//       catInfoElement.appendChild(catDescriptionElement);
//       catInfoElement.appendChild(temperamentElement);

//       catInfoElement.style.padding = '15px';

//       hideElement(loaderElement);
//       showElement(catInfoElement);
//     })
//     .catch(error => {
//       hideElement(loaderElement);
//       hideElement(catInfoElement);
//       showElement(errorElement);
//       Notiflix.Report.failure('Error', `${error}`);
//     });
// }

// function hideElement(element) {
//   element.classList.add('hidden');
// }

// function showElement(element) {
//   element.classList.remove('hidden');
// }

// function showLoader(element) {
//   element.classList.add('active');
// }

// function hideLoader(element) {
//   element.classList.remove('active');
// }

// function fetchBreeds() {
//   return axios
//     .get(`${API}/breeds`)
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Error fetching breeds:', error);
//       throw error;
//     });
// }

// function fetchCatByBreed(breedId) {
//   return axios
//     .get(`${API}/images/search?breed_ids=${breedId}&include_breeds=true`)
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Error fetching cat by breed:', error);
//       throw error;
//     });
// }

// =======================================================
// const elements = {
//   breedSelect: document.querySelector('.breed-select'),
//   loader: document.querySelector('.loader'),
//   error: document.querySelector('.error'),
//   catInfo: document.querySelector('.cat-info'),
// };

// const showLoader = () => {
//   elements.loader.innerHTML = `<span class="loader"></span>`;
// };

// const hideLoader = () => {
//   elements.loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const { url } = catData;
//   const { name, description, temperament } = catData.breeds[0];

//   elements.catInfo.innerHTML = `
//     <img src="${url}" alt="cat ${name}" width="480">
//     <h2 style="max-width: 480px">${name}</h2>
//     <p style="max-width: 480px">${description}</p>
//     <p style="max-width: 480px">Temperament: ${temperament}</p>
//   `;

//   elements.catInfo.style.padding = '15px';
// };

// const showError = errorMessage => {
//   elements.error.textContent = errorMessage;
//   elements.error.style.display = 'block';
// };

// const hideError = () => {
//   elements.error.style.display = 'none';
// };

// showLoader();

// fetchBreeds()
//   .then(breeds => {
//     breeds.forEach(breed => {
//       const optionElement = document.createElement('option');
//       optionElement.value = breed.id;
//       optionElement.textContent = breed.name;
//       elements.breedSelect.appendChild(optionElement);
//     });

//     elements.breedSelect.addEventListener('change', () => {
//       const selectedBreedId = elements.breedSelect.value;
//       showLoader();

//       fetchCatByBreed(selectedBreedId)
//         .then(catData => {
//           displayCatInfo(catData[0]);
//           hideLoader();
//         })
//         .catch(error => {
//           hideLoader();
//           showError(error);
//         });
//     });

//     hideLoader();
//     hideError();
//   })
//   .catch(error => {
//     hideLoader();
//     showError('Error loading breeds. Please try again.');
//   });

// ==================================================================
