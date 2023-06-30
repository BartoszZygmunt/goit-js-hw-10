import { fetchBreeds, displayCatInfo } from './cat-api.js';

// Pobranie ras kotów
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
      const selectedBreedId = event.target.value;
      displayCatInfo(selectedBreedId);
    });
  })
  .catch(error => {
    console.error('Error fetching cat breeds:', error);
  });
