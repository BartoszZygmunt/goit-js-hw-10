import './sass/index.scss';
import { fetchBreeds, displayCatInfo } from './cat-api.js';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement2',
});

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divError = document.querySelector('.error');

//pokaż loader i ukryj listę
loader.classList.remove('hide');
breedSelect.classList.add('hide');

// Pobranie ras kotów
fetchBreeds()
  .then(breeds => {
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

    //ukryj loader i pokaz listę
    loader.classList.add('hide');
    breedSelect.classList.remove('hide');
  })
  .catch(error => {
    console.error('123 Error fetching cat breeds:', error);
    divError.classList.remove('hide');
    loader.classList.add('hide');
    setTimeout(() => {
      divError.classList.add('hide');
    }, 3000);
  });
