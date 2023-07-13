const elements = {
  form: document.querySelector('.js-weather'),
  container: document.querySelector('.js-weather-list'),
};

elements.form.addEventListener('submit', handlerSearch);

navigator.geolocation.getCurrentPosition(({ coords }) => {
  const { longitude, latitude } = coords;
  serviceForecast(`${latitude},${longitude}`, 3)
    .then(
      data =>
        (elements.container.innerHTML = createMarkup(data.forecast.forecastday))
    )
    .catch(err => console.log(err));
});

function handlerSearch(evt) {
  evt.preventDefault();

  const { query, days } = evt.currentTarget.elements;
  serviceForecast(query.value, days.value)
    .then(
      data =>
        (elements.container.innerHTML = createMarkup(data.forecast.forecastday))
    )
    .catch(err => console.log(err));
}

function serviceForecast(city, days) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const END_POINT = '/forecast.json';
  const API_KEY = '14c56bddeab14583a6e164909231107';

  const params = new URLSearchParams({
    days: days,
    key: API_KEY,
    lang: 'uk',
    q: city,
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `<li>
    <img src="${icon}" alt="${text}">
    <h3>Дата: ${date}</h3>
    <h3>${text}</h3>
    <h3>Температура: ${avgtemp_c}</h3>
</li>`
    )
    .join('');
}

// ===================================================

// 1<span class="loader"></span>
// .loader {
//   width: 48px;
//   height: 48px;
//   display: block;
//   margin: 20px auto;
//   position: relative;
//   border: 3px solid #FFF;
//   border-radius: 50%;
//   box-sizing: border-box;
//   animation: animloader 2s linear infinite;
// }
// .loader::after {
//   content: '';
//   box-sizing: border-box;
//   width: 6px;
//   height: 24px;
//   background: #FFF;
//   transform: rotate(-45deg);
//   position: absolute;
//   bottom: -20px;
//   left: 46px;
// }

// @keyframes animloader {
//   0% {
//     transform: translate(-10px, -10px);
//   }
//   25% {
//     transform: translate(-10px, 10px);
//   }
//   50% {
//     transform: translate(10px, 10px);
//   }
//   75% {
//     transform: translate(10px, -10px);
//   }
//   100% {
//     transform: translate(-10px, -10px);
//   }
// }
