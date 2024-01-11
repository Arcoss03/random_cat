import axios from 'axios'

const bearerToken = 'live_JHo4ZzZdBmVNfwSKPyO3w5T01L7SDxz28DvClwjsben4R2IVkjTREyuq7xml1Qpc';

const appContainer = document.querySelector('#app');
let newCatUrl = "https://cdn2.thecatapi.com/images/b7f.jpg";

async function updateCatImage() {
  newCatUrl = await getNewCatUrl();
  if (newCatUrl) {
    const catImage = document.querySelector('.logo');
    catImage.src = newCatUrl;
  }
}

// Ajout d'un bouton qui déclenche la mise à jour de l'image au clic
appContainer.innerHTML = 
`
  <div class="container">
    <img src="${newCatUrl}" class="logo" alt="Chat" />
  </div>
  <button id="changeCatButton">Changer d'image de chat</button>
`;

// Écouteur d'événements pour le bouton
document.querySelector('#changeCatButton').addEventListener('click', updateCatImage);

// Initialisation du compteur
setupCounter(document.querySelector('#counter'));

// Fonction pour obtenir une nouvelle URL d'image de chat
async function getNewCatUrl() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Erreur lors de la requête. Statut : ${response.status}`);
    }

    const catUrl = response.data[0].url;
    return catUrl;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image du chat :', error.message);
    return null;
  }
}
