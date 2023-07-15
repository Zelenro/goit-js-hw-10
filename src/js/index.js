import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchCatByBreed } from './cat-api.js';
import '/src/css/slimselect.css';
import '/src/css/loader.css';

const options = {
  position: 'center-center',
  distance: '15px',
  borderRadius: '15px',
  clickToClose: true,
};

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.innerHTML = '<div class="loader"></div>';

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const displayCatInfo = catData => {
  const { url } = catData;
  const { name, description, temperament } = catData.breeds[0];

  catInfo.innerHTML = `
    <img class="cat-img" src="${url}" alt="cat ${name}" width="480">
    <h2 class="cat-name">${name}</h2>
    <p class="cat-description">${description}</p>
    <p class="cat-temperament">Temperament: ${temperament}</p>
  `;
  catInfo.style.display = 'block';
};

const showError = errorMessage => {
  Notiflix.Report.Failure('Error', errorMessage, 'OK');
};

const hideError = () => {
  error.style.display = 'none';
};

const fetchBreeds = () => {
  return axios
    .get(`${API}/breeds`)
    .then(response => response.data)
    .catch(error => {
      hideLoader();
      showError(error.message);
      throw new Error(error.message);
    });
};

showLoader();
hideError();

fetchBreeds()
  .then(breeds => {
    const getValueToSelect = data => {
      const catsInfo = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');
      breedSelect.innerHTML = catsInfo;
      new SlimSelect({
        select: breedSelect,
      });
    };

    getValueToSelect(breeds);

    breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;
      showLoader();
      hideError();

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          displayCatInfo(catData);
          hideLoader();
        })
        .catch(error => {
          hideLoader();
          showError(error.message);
        });
    });

    hideLoader();
  })
  .catch(error => {
    hideLoader();
    showError(error.message);
  });

// ===============================================
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import axios from 'axios';
// import '/src/css/slimselect.css';
// import '/src/css/loader.css';

// const options = {
//   position: 'center-center',
//   distance: '15px',
//   borderRadius: '15px',
//   clickToClose: true,
// };

// const API = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// loader.innerHTML = '<div class="loader"></div>';

// const showLoader = () => {
//   loader.style.display = 'block';
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const { url } = catData;
//   const { name, description, temperament } = catData.breeds[0];

//   catInfo.innerHTML = `
//     <img class="cat-img" src="${url}" alt="cat ${name}" width="480">
//     <h2 class="cat-name">${name}</h2>
//     <p class="cat-description">${description}</p>
//     <p class="cat-temperament">Temperament: ${temperament}</p>
//   `;
//   catInfo.style.display = 'block';
// };

// const showError = errorMessage => {
//   Notiflix.Report.Failure('Error', errorMessage, 'OK');
// };

// const hideError = () => {
//   error.style.display = 'none';
// };

// const fetchBreeds = () => {
//   return axios
//     .get(`${API}/breeds`)
//     .then(response => response.data)
//     .catch(error => {
//       hideLoader();
//       showError(error.message);
//       throw new Error(error.message);
//     });
// };

// const fetchCatByBreed = breedId => {
//   return axios
//     .get(`${API}/images/search?breed_ids=${breedId}`)
//     .then(response => response.data[0])
//     .catch(error => {
//       hideLoader();
//       showError(error.message);
//       throw new Error(error.message);
//     });
// };

// const getValueToSelect = data => {
//   const catsInfo = data
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join(' ');
//   breedSelect.innerHTML = catsInfo;
//   new SlimSelect({
//     select: breedSelect,
//   });
// };

// showLoader();
// hideError();

// fetchBreeds()
//   .then(breeds => {
//     getValueToSelect(breeds);

//     breedSelect.addEventListener('change', () => {
//       const selectedBreedId = breedSelect.value;
//       showLoader();
//       hideError();

//       fetchCatByBreed(selectedBreedId)
//         .then(catData => {
//           displayCatInfo(catData);
//           hideLoader();
//         })
//         .catch(error => {
//           hideLoader();
//           showError(error.message);
//         });
//     });

//     hideLoader();
//   })
//   .catch(error => {
//     hideLoader();
//     showError(error.message);
//   });

// ============================================
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import axios from 'axios';
// import '/src/css/slimselect.css';
// import '/src/css/loader.css';

// const options = {
//   position: 'center-center',

//   distance: '15px',
//   borderRadius: '15px',
//   clickToClose: true,
// };

// const API = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// loader.innerHTML = '<div class="loader"></div>';

// const showLoader = () => {
//   loader.style.display = 'block';
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const { url } = catData;
//   const { name, description, temperament } = catData.breeds[0];

//   catInfo.innerHTML = `
//       <img class="cat-img" src="${url}" alt="cat ${name}" width="480">
//       <h2 class="cat-name">${name}</h2>
//       <p class="cat-description">${description}</p>
//       <p class="cat-temperament">Temperament: ${temperament}</p>
//   `;
//   catInfo.style.display = 'block';
// };

// const showError = errorMessage => {
//   error.textContent = errorMessage;
//   error.style.display = 'block';
// };

// const hideError = () => {
//   error.style.display = 'none';
// };

// const fetchBreeds = () => {
//   return axios
//     .get(`${API}/breeds`)
//     .then(response => response.data)
//     .catch(error => {
//       throw Notiflix.Notify.failure(
//         `Oops! Something went wrong! Try reloading the page!`,
//         options
//       );
//     });
// };

// const fetchCatByBreed = breedId => {
//   return axios
//     .get(`${API}/images/search?breed_ids=${breedId}`)
//     .then(response => response.data[0])
//     .catch(error => {
//       throw Notiflix.Notify.failure(
//         `Oops! Something went wrong! Try reloading the page!`,
//         options
//       );
//     });
// };

// const getValueToSelect = data => {
//   const catsInfo = data
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join(' ');
//   breedSelect.innerHTML = catsInfo;
//   new SlimSelect({
//     select: breedSelect,
//   });
// };

// showLoader();

// fetchBreeds()
//   .then(breeds => {
//     getValueToSelect(breeds);

//     breedSelect.addEventListener('change', () => {
//       const selectedBreedId = breedSelect.value;
//       showLoader();
//       hideError();

//       fetchCatByBreed(selectedBreedId)
//         .then(catData => {
//           displayCatInfo(catData);
//           hideLoader();
//         })
//         .catch(error => {
//           hideLoader();
//           showError(error.message);
//         });
//     });

//     hideLoader();
//   })
//   .catch(error => {
//     hideLoader();
//     showError(error.message);
//   });

// ==============================================
// БАЗА_2
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import axios from 'axios';
// import '/src/css/slimselect.css';
// import '/src/css/loader.css';

// const API = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_Z93FvyevdhtMX0LprNdVKvkdQzy4JZilxfq0yq1IjDF2wOdAMevk7DGpNgvwJrXr';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// loader.innerHTML = '<div class="loader"></div>';

// const showLoader = () => {
//   loader.style.display = 'block';
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const { url } = catData;
//   const { name, description, temperament } = catData.breeds[0];

//   catInfo.innerHTML = `
//       <img class="cat-img" src="${url}" alt="cat ${name}" width="480">
//       <h2 class="cat-name">${name}</h2>
//       <p class="cat-description">${description}</p>
//       <p class="cat-temperament">Temperament: ${temperament}</p>
//   `;
//   catInfo.style.display = 'block';
// };

// const showError = errorMessage => {
//   Notiflix.Report.Failure('Error', errorMessage, 'OK');
// };

// const hideError = () => {
//   error.style.display = 'none';
// };

// const fetchBreeds = () => {
//   return axios
//     .get(`${API}/breeds`)
//     .then(response => response.data)
//     .catch(error => {
//       throw new Error('Error loading breeds. Please try again.');
//     });
// };

// const fetchCatByBreed = breedId => {
//   return axios
//     .get(`${API}/images/search?breed_ids=${breedId}`)
//     .then(response => response.data[0])
//     .catch(error => {
//       throw new Error('Error loading cat data. Please try again.');
//     });
// };

// const getValueToSelect = data => {
//   const catsInfo = data
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join(' ');
//   breedSelect.innerHTML = catsInfo;
//   new SlimSelect({
//     select: breedSelect,
//   });
// };

// showLoader();

// fetchBreeds()
//   .then(breeds => {
//     getValueToSelect(breeds);

//     breedSelect.addEventListener('change', () => {
//       const selectedBreedId = breedSelect.value;
//       showLoader();

//       fetchCatByBreed(selectedBreedId)
//         .then(catData => {
//           displayCatInfo(catData);
//           hideLoader();
//         })
//         .catch(error => {
//           hideLoader();
//           showError(error.message);
//         });
//     });

//     hideLoader();
//     hideError();
//   })
//   .catch(error => {
//     hideLoader();
//     showError(error.message);
//   });

// ========================================================
// import SlimSelect from 'slim-select';
// import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import Notiflix from 'notiflix';
// import '/src/css/slimselect.css';

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// const showLoader = () => {
//   loader.innerHTML = `<span class="loader"></span>`;
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const { url } = catData;
//   const { name, description, temperament } = catData.breeds[0];

//   catInfo.innerHTML = `
//     <img class="cat-img" src="${url}" alt="cat ${name}" width="480">
//     <h2 class="cat-name">${name}</h2>
//     <p class="cat-description">${description}</p>
//     <p class="cat-temperament">Temperament: ${temperament}</p>
//   `;
// };

// const showErrorMessage = errorMessage => {
//   error.textContent = errorMessage;
//   error.classList.add('show');
// };

// const hideErrorMessage = () => {
//   error.classList.remove('show');
// };

// const populateBreedSelect = breeds => {
//   const breedOptions = breeds
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join(' ');
//   breedSelect.insertAdjacentHTML('beforeend', breedOptions);
//   new SlimSelect({
//     select: breedSelect,
//   });
// };

// const handleBreedSelectChange = () => {
//   const selectedBreedId = breedSelect.value;
//   showLoader();
//   hideErrorMessage();

//   fetchCatByBreed(selectedBreedId)
//     .then(catData => {
//       displayCatInfo(catData[0]);
//       hideLoader();
//       hideErrorMessage(); // Приховуємо елемент помилки при успішній операції
//     })
//     .catch(error => {
//       hideLoader();
//       console.error(error);
//       showErrorMessage('Error loading cat information. Please try again.');
//     });
// };

// showLoader();
// hideErrorMessage();

// fetchBreeds()
//   .then(breeds => {
//     populateBreedSelect(breeds);
//     breedSelect.addEventListener('change', handleBreedSelectChange);
//     hideLoader();
//     hideErrorMessage(); // Приховуємо елемент помилки при успішній операції
//   })
//   .catch(error => {
//     hideLoader();
//     console.error(error);
//     showErrorMessage('Error loading breeds. Please try again.');
//   });

// Notiflix.Notify.init();
