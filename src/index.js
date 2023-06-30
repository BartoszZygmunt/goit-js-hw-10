import { fetchBreeds, displayCatInfo } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

// Pobranie ras kotów
breedSelect.classList.add('show');
loader.classList.add('show');
catInfoDiv.classList.remove('show');

fetchBreeds()
  .then(breeds => {
    const breedSelect = document.querySelector('.breed-select');

    // Wypełnienie select opcjami na podstawie danych o rasach
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.innerText = breed.name;
      option.dataset.description = breed.description;
      option.dataset.temperament = breed.temperament;
      breedSelect.appendChild(option);
    });

    // Nasłuchiwanie zdarzenia change na elemencie select
    breedSelect.addEventListener('change', event => {
      loader.classList.add('show');
      const selectedBreedId = event.target.value;
      displayCatInfo(selectedBreedId);
      loader.classList.remove('show');
    });
  })
  .catch(error => {
    console.error('Error fetching cat breeds:', error);
    hideLoader();
  });
