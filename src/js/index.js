import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const displayCatInfo = catData => {
  const imageElement = document.createElement('img');
  imageElement.src = catData.url;
  imageElement.width = 300;

  const nameElement = document.createElement('h2');
  nameElement.textContent = catData.breeds[0].name;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = catData.breeds[0].description;

  const temperamentElement = document.createElement('p');
  temperamentElement.textContent = `Temperament: ${catData.breeds[0].temperament}`;

  catInfo.innerHTML = '';
  catInfo.appendChild(imageElement);
  catInfo.appendChild(nameElement);
  catInfo.appendChild(descriptionElement);
  catInfo.appendChild(temperamentElement);
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

// ===========================================================

// import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// const showLoader = () => {
//   loader.style.display = 'block';
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
// };

// const displayCatInfo = catData => {
//   const imageElement = document.createElement('img');
//   imageElement.src = catData.url;
//   imageElement.width = 300;
//   imageElement.height = 200;

//   const nameElement = document.createElement('h2');
//   nameElement.textContent = catData.breeds[0].name;

//   const descriptionElement = document.createElement('p');
//   descriptionElement.textContent = catData.breeds[0].description;

//   const temperamentElement = document.createElement('p');
//   temperamentElement.textContent = `Temperament: ${catData.breeds[0].temperament}`;

//   catInfo.innerHTML = '';
//   catInfo.appendChild(imageElement);
//   catInfo.appendChild(nameElement);
//   catInfo.appendChild(descriptionElement);
//   catInfo.appendChild(temperamentElement);
// };

// const showError = errorMessage => {
//   error.textContent = errorMessage;
//   error.style.display = 'block';
// };

// const hideError = () => {
//   error.style.display = 'none';
// };

// showLoader();

// fetchBreeds()
//   .then(breeds => {
//     const breedOptions = breeds.map(breed => ({
//       value: breed.id,
//       text: breed.name,
//     }));

//     new SlimSelect({
//       select: breedSelect,
//       placeholder: 'Select a breed',
//       data: breedOptions,
//       onChange: info => {
//         const selectedBreedId = info.value();
//         showLoader();

//         fetchCatByBreed(selectedBreedId)
//           .then(catData => {
//             displayCatInfo(catData[0]);
//             hideLoader();
//           })
//           .catch(error => {
//             hideLoader();
//             showError(error);
//           });
//       },
//     });

//     hideLoader();
//     hideError();
//   })
//   .catch(error => {
//     hideLoader();
//     showError('Error loading breeds. Please try again.');
//   });
