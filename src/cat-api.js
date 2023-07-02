import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_J7ed4oG6Xw6A2thQTqDeiztQtIRkAmYBI2c26M1D9rUDTmUojJvFjk3MR1zVFrBE';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { select } from './index.js';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function displayCatInfo(breedId) {
  //   debugger;
  const loader = document.querySelector('.loader');
  const catInfoDiv = document.querySelector('.cat-info');

  //pokaz loader i ukryj info

  loader.classList.remove('hide');
  catInfoDiv.classList.add('hide');

  // Znajdowanie wybranej rasy na podstawie breedId
  const selectedBreed = select.getSelected(); // Will return an array of strings
  //console.log(selectedBreed);

  if (selectedBreed) {
    // Pobieranie informacji o kocie na podstawie wybranej rasy
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        // debugger;
        const catImage = response.data[0].url;
        const catName = response.data[0].breeds[0].name;
        const catDescription = response.data[0].breeds[0].description;
        const catTemperament = response.data[0].breeds[0].temperament;

        // Wyświetlanie obrazu i informacji o kocie
        const catInfoHTML = `
          <img class="cat-img" src="${catImage}" alt="${catName}" />
          <div class="catInfo"> 
            <h3>${catName}</h3>
            <p><strong>Description:</strong> ${catDescription}</p>
            <p><strong>Temperament:</strong> ${catTemperament}</p>
          </div>
        `;
        catInfoDiv.innerHTML = catInfoHTML;
        //pokaz info i ukryj loader
        loader.classList.add('hide');
        catInfoDiv.classList.remove('hide');
      })
      .catch(error => {
        Notify.failure('Error fetching cat breeds:', error);
        const breedSelect = document.querySelector('.breed-select');
        loader.classList.add('hide');
        breedSelect.classList.add('hide');
      });
  }
}
