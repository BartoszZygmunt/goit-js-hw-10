import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_J7ed4oG6Xw6A2thQTqDeiztQtIRkAmYBI2c26M1D9rUDTmUojJvFjk3MR1zVFrBE';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      throw error;
    });
}

export function displayCatInfo(breedId) {
  const loader = document.querySelector('.loader');
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');

  //pokaz loader i ukryj info

  loader.classList.remove('hide');
  catInfoDiv.classList.add('hide');

  // Znajdowanie wybranej rasy na podstawie breedId
  const selectedBreed = Array.from(breedSelect.options).find(
    option => option.value === breedId
  );

  if (selectedBreed) {
    // Pobieranie informacji o kocie na podstawie wybranej rasy
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        const catImage = response.data[0].url;
        const catName = selectedBreed.innerText;
        const catDescription = selectedBreed.dataset.description;
        const catTemperament = selectedBreed.dataset.temperament;

        // Wyświetlanie obrazu i informacji o kocie
        const catInfoHTML = `
          <img class="cat-img" src="${catImage}" alt="${catName}" />
          <h3>${catName}</h3>
          <p><strong>Description:</strong> ${catDescription}</p>
          <p><strong>Temperament:</strong> ${catTemperament}</p>
        `;
        catInfoDiv.innerHTML = catInfoHTML;
        //pokaz info i ukryj loader
        loader.classList.add('hide');
        catInfoDiv.classList.remove('hide');
      })
      .catch(error => {
        console.error('Error fetching cat image:', error);
        catInfoDiv.innerHTML = '<p>Error fetching cat image.</p>';
        loader.classList.remove('hide');
        setTimeout(() => {
          loader.classList.remove('hide');
        }, 2000);
      });
  }
}
