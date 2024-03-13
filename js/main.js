const TilesContainer = document.querySelector(".tiles");
const images = [
    "/images/paul.jpg", "/images/paul.jpg",
    "/images/romain.jpg", "/images/romain.jpg",
    "/images/najm.jpg", "/images/najm.jpg",
    "/images/singe.jpg", "/images/singe.jpg",
    "/images/noe.jpg", "/images/noe.jpg", 
    "/images/girafe.jpg", "/images/girafe.jpg",
    "/images/chaise.jpg", "/images/chaise.jpg",
    "/images/charlie.png", "/images/charlie.png",
    "/images/pomme.jpg", "/images/pomme.jpg",
    "/images/sonic.jpg", "/images/sonic.jpg"
];

let pairsFound = 0;
let attempts = 0;
let flippedTiles = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTile(image) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    
    const content = document.createElement("div");
    content.classList.add("content");
    content.style.backgroundColor = 'white';

    content.setAttribute('data-image', image);
    
    tile.appendChild(content);
    
    tile.addEventListener("click", () => flipTile(tile));
    
    return tile;
}

function flipTile(tile) {
    // Vérifier si la carte a déjà été retournée
    if (!tile.classList.contains("flipped")) {
        tile.classList.add("flipped");
        
        // Récupérer le contenu de la carte
        const content = tile.querySelector('.content');
        
        // Récupérer le chemin de l'image depuis l'attribut data
        const image = content.getAttribute('data-image');
        
        // Définir l'image de fond
        tile.style.backgroundImage = `url(${image})`;
        
        // Ajouter la carte retournée à la liste des cartes retournées
        flippedTiles.push(tile);
        
        // Vérifier si deux cartes sont retournées
        if (flippedTiles.length === 2) {
            const [firstTile, secondTile] = flippedTiles;
            // Incrémenter le nombre de tentatives
            attempts++;
            // Mettre à jour l'affichage du nombre de tentatives
            document.getElementById('attempts').textContent = attempts;

            // Si les images des deux cartes correspondent
            if (firstTile.querySelector('.content').getAttribute('data-image') === 
                secondTile.querySelector('.content').getAttribute('data-image')) {
                // Incrémenter le nombre de paires trouvées
                pairsFound++;
                // Mettre à jour l'affichage du nombre de paires trouvées
                document.getElementById('pairsFound').textContent = pairsFound;

                // Vérifier si toutes les paires ont été trouvées
                if (pairsFound === images.length / 2) {
                    // Afficher un message de félicitations
                    displayVictoryMessage();
                }
            } else {
                // Retourner les deux cartes à la couleur d'origine après un court délai
                setTimeout(() => {
                    firstTile.style.backgroundImage = `none`;
                    secondTile.style.backgroundImage = `none`;
                    firstTile.classList.remove("flipped");
                    secondTile.classList.remove("flipped");
                    // Mettre à jour l'affichage du nombre de tentatives après le retour des cartes
                    document.getElementById('attempts').textContent = attempts;
                }, 1000);
            }
            // Réinitialiser la liste des cartes retournées
            flippedTiles = [];
        }
    }
}

function initializeGame() {
    const shuffledImages = shuffle(images);
    shuffledImages.forEach(image => {
        const tile = createTile(image);
        TilesContainer.appendChild(tile);
    });
}

function createConfetti() {
    const numConfettis = 100; // Nombre de confettis à afficher

    for (let i = 0; i < numConfettis; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * window.innerWidth}px`; // Position aléatoire sur l'axe horizontal
        confetti.style.top = `${Math.random() * window.innerHeight}px`; // Position aléatoire sur l'axe vertical
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Durée de l'animation entre 2 et 5 secondes
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Couleur aléatoire
        document.body.appendChild(confetti);

        // Supprimer le confetti après l'animation
        confetti.addEventListener("animationend", () => {
            confetti.remove();
        });
    }
}

// Fonction pour afficher le message de victoire
function displayVictoryMessage() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex'; // Afficher l'overlay
    document.body.classList.add('blur'); // Appliquer un flou au fond
    createConfetti();
}

initializeGame();
