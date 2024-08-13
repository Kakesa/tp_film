const form = document.getElementById('film-form');
const filmCards = document.getElementById('film-cards');
const addFilmButton = document.getElementById('add-film');
const updateFilmButton = document.getElementById('update-film');
const cancelUpdateButton = document.getElementById('cancel-update');
const addFilmBtn = document.getElementById('add-film-btn');
const modal = document.getElementById('add-film-modal');
const closeButton = document.getElementsByClassName('close-button')[0];

let films = JSON.parse(localStorage.getItem('films')) || [];
let editingIndex = null;

// Récupération des éléments du DOM
const editFilmModal = document.getElementById("edit-film-modal");
const editFilmForm = document.getElementById("edit-film-form");
const editTitleInput = document.getElementById("edit-title");
const editDirectorInput = document.getElementById("edit-director");
const editYearInput = document.getElementById("edit-year");
const editDescriptionInput = document.getElementById("edit-description");
const saveChangesButton = document.getElementById("save-changes");
const cancelEditButton = document.getElementById("cancel-edit");

// Fonction pour ouvrir le modal de modification
function openEditModal(film) {
  editTitleInput.value = film.title;
  editDirectorInput.value = film.director;
  editYearInput.value = film.year;
  editDescriptionInput.value = film.description;
  editFilmModal.style.display = "block";
}

// Fonction pour fermer le modal de modification
function closeEditModal() {
  editFilmModal.style.display = "none";
}

// Gestion de l'événement de soumission du formulaire de modification
editFilmForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const updatedFilm = {
    title: editTitleInput.value,
    director: editDirectorInput.value,
    year: editYearInput.value,
    description: editDescriptionInput.value,
  };

  // Appel à une fonction pour mettre à jour le film dans la liste des films
  updateFilm(editFilmIndex, updatedFilm);

  closeEditModal();
});

// Gestion de l'événement de clic sur le bouton "Annuler"
cancelEditButton.addEventListener("click", () => {
  closeEditModal();
});

// Variable pour stocker l'index du film à modifier
let editFilmIndex;

// Fonction pour ouvrir le modal de modification et préparer les données
function editFilm(index) {
  editFilmIndex = index;
  const filmToEdit = films[index];
  openEditModal(filmToEdit);
}

// Fonction pour mettre à jour un film dans la liste des films
function updateFilm(index, updatedFilm) {
  films[index] = updatedFilm;
  saveFilmsToLocalStorage();
  renderFilms();
}

function addFilm(film) {
  films.push(film);
  saveFilmsToLocalStorage();
  renderFilms();
}

function deleteFilm(index) {
  films.splice(index, 1);
  saveFilmsToLocalStorage();
  renderFilms();
}

function renderFilms() {
  filmCards.innerHTML = '';
  for (let i = 0; i < films.length; i++) {
    const card = document.createElement('div');
    card.classList.add('film-card');
    card.innerHTML = `
      <h3>${films[i].title}</h3>
      <p>Réalisateur : ${films[i].director}</p>
      <p>Année : ${films[i].year}</p>
      <p>${films[i].description}</p>
      <div>
        <button onclick="editFilm(${i})">Modifier</button>
        <button onclick="deleteFilm(${i})">Supprimer</button>
      </div>
    `;
    filmCards.appendChild(card);
  }
}

function editFilm(index) {
  editingIndex = index;
  const film = films[index];
  document.getElementById('title').value = film.title;
  document.getElementById('director').value = film.director;
  document.getElementById('year').value = film.year;
  document.getElementById('description').value = film.description;
  addFilmButton.style.display = 'none';
  updateFilmButton.style.display = 'inline-block';
  cancelUpdateButton.style.display = 'inline-block';
  modal.style.display = 'block';
}

function cancelUpdate() {
  editingIndex = null;
  form.reset();
  addFilmButton.style.display = 'inline-block';
  updateFilmButton.style.display = 'none';
  cancelUpdateButton.style.display = 'none';
  modal.style.display = 'none';
}

function saveFilmsToLocalStorage() {
  localStorage.setItem('films', JSON.stringify(films));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const film = {
    title: document.getElementById('title').value,
    director: document.getElementById('director').value,
    year: document.getElementById('year').value,
    description: document.getElementById('description').value
  };
  if (editingIndex !== null) {
    updateFilm(editingIndex, film);
  } else {
    addFilm(film);
  }
  form.reset();
  modal.style.display = 'none';
});

cancelUpdateButton.addEventListener('click', cancelUpdate);

addFilmBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

renderFilms();