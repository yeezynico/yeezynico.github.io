const modal = document.getElementsByClassName('modal')[0]
AOS.init();
// Barre de recherche 
document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    getSearchResults(search);
});

// Fonction pour récupérer les résultats de la recherche de l'API
const getSearchResults = (search) => {
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=1ff1fd1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resultat(data.Search);
        })
        .catch((error) => console.error('Erreur de réponse :', error.message));
};

// Fonction pour afficher les résultats de la recherche
const resultat = (results) => {
    const film = document.getElementById('film');
    film.innerHTML = '';
    if (results) {
        results.forEach((result) => {
            showFilm(result.Title, result.Year, result.Poster);
        });

        // Observer les éléments film-items pour l'effet d'apparition au fur et à mesure du défilement
        document.querySelectorAll('.film-item').forEach(item => {
            observer.observe(item);
        });
    } else {
        film.innerHTML = '<p>Aucun résultat trouvé</p>';
    }
};

// Fonction pour afficher un film ( Read more )
const showFilm = (Title, Released, Poster) => {
    const filmDiv = document.getElementById('film');
    // filmDiv.classList.add('film-item');  
    filmDiv.innerHTML += `
        <div class="test" data-aos="fade-left" data-aos-duration="1000">
            <img src="${Poster}">
            <h2> Titre : ${Title}</h2>
            <p> Date de sortie : ${Released} </p>
            <button class="readMoreBtn">Read more</button>
        </div>
    `;
    // document.getElementById('film').appendChild(filmDiv);

    // ajout d'un événement sur chaque bouton "Read more"
    filmDiv.querySelector('.readMoreBtn').addEventListener('click', function () {
        openModalWithFilm(Title);
    });
};

// Fonction pour ouvrir la pop up avec les détails du film
const openModalWithFilm = (Title) => {
    modal.style.display = "block";
    getFilmDetails(Title);
};

// Fonction API pour récupérer les détails du film
const getFilmDetails = (Title) => {
    fetch(`https://www.omdbapi.com/?t=${Title}&apikey=1ff1fd1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const Released = data.Released;
            const Poster = data.Poster;

            const element = document.getElementById('modal-content');

            element.innerHTML = `
                <div>
                    <span class="close" onclick="closeP()">&times;</span>
                    <img src="${Poster}">
                    <h2> Titre : ${Title}</h2>
                    <p> Date de sortie : ${Released} </p>
                </div>
            `;
        })
        .catch((error) => console.error('Erreur de réponse :', error.message));
};

// Fonction pour fermer le pop up 
function closeP() {
    modal.style.display = "none";
}

// Fermer la pop up lorsque l'utilisateur clique en dehors de celle-ci
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// // Création de l'IntersectionObserver pour l'effet d'apparition au fur et à mesure du défilement
// let observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//             observer.unobserve(entry.target); // Arrêter l'observation une fois que l'élément est devenu visible
//         }
//     });
// }, { threshold: 0.5 }); 

