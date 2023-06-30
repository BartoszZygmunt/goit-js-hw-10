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
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');

  // Znajdowanie wybranej rasy na podstawie breedId
  let selectedBreed;
  for (let i = 0; i < breedSelect.options.length; i++) {
    const option = breedSelect.options[i];
    if (option.value === breedId) {
      selectedBreed = option;
      break;
    }
  }

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
          <img src="${catImage}" alt="${catName}" />
          <h3>${catName}</h3>
          <p><strong>Description:</strong> ${catDescription}</p>
          <p><strong>Temperament:</strong> ${catTemperament}</p>
        `;
        catInfoDiv.innerHTML = catInfoHTML;
      })
      .catch(error => {
        console.error('Error fetching cat image:', error);
        catInfoDiv.innerHTML = '<p>Error fetching cat image.</p>';
      });
  }
}
