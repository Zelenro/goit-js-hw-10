import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/src/css/slimselect.css';
import '/src/css/loader.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

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

const hideSelect = () => {
  breedSelect.style.display = 'none';
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
  Notiflix.Report.failure(
    'Error',
    'Oops! Something went wrong! Try reloading the page!'
  );
};

const hideError = () => {
  error.style.display = 'none';
};

const getValueToSelect = data => {
  const catsInfo = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join(' ');
  breedSelect.innerHTML = catsInfo;
  new SlimSelect({
    select: breedSelect,
  });
};

showLoader();
hideError();

fetchBreeds()
  .then(breeds => {
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
          showError();
          hideSelect();
        });
    });

    hideLoader();
  })
  .catch(error => {
    hideLoader();
    showError();
    hideSelect();
  });
