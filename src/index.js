import './sass/index.scss';
import '../node_modules/slim-select/dist/slimselect.css';
import { fetchBreeds, displayCatInfo } from './cat-api.js';
import Slimselect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const select = new Slimselect({
  select: '#selectElement',
  events: {
    afterChange: newVal => {
      displayCatInfo(newVal[0].value);
    },
  },
});

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

//pokaż loader i ukryj listę
loader.classList.remove('hide');
breedSelect.classList.add('hide');

// Pobranie ras kotów
fetchBreeds()
  .then(breeds => {
    const options = breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));
    // Wypełnienie select opcjami na podstawie danych o rasach
    select.setData(options);

    //ukryj loader i pokaz listę
    loader.classList.add('hide');
    breedSelect.classList.remove('hide');
  })
  .catch(error => {
    Notify.failure('Error fetching cat breeds:', error);
  });
