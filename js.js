// Création des différents tétriminos

let tétriminoI = [
    [[1, 1, 1, 1]], // Horizontal
    [[1], [1], [1], [1]] // Vertical
];

let tétriminoO = [[[1, 1], [1, 1]]]; // Une seule orientation

let tétriminoT = [
    [[1, 1, 1], [0, 1, 0]], // Bas
    [[0, 1], [1, 1], [0, 1]], // Gauche
    [[0, 1, 0], [1, 1, 1]], // Haut
    [[1, 0], [1, 1], [1, 0]] // DroiteT
];

let tétriminoL = [
    [[1, 1, 1], [1, 0, 0]], // Bas
    [[1, 1], [0, 1], [0, 1]], // Gauche 
    [[0, 0, 1], [1, 1, 1]], // Haut
    [[1, 0], [1, 0], [1, 1]] // Droite
];

let tétriminoJ = [
    [[1, 1, 1], [0, 0, 1]], // Bas
    [[0, 1], [0, 1], [1, 1]], // Gauche
    [[1, 0, 0], [1, 1, 1]], // Haut
    [[1, 1], [1, 0], [1, 0]] // Droite
];

let tétriminoZ = [
    [[1, 1, 0], [0, 1, 1]], // Horizontal
    [[0,1], [1, 1], [1, 0]] // Vertical
];

let tétriminoS = [
    [[0, 1, 1], [1, 1, 0]], // Horizontal
    [[1, 0], [1, 1], [0, 1]] // Vertical
];

let tétriminos = [tétriminoI, tétriminoJ, tétriminoL, tétriminoO, tétriminoS, tétriminoT, tétriminoZ];

// Choix aléatoire de la forme 

let choixAléatoireTétrimino = tétriminos[Math.floor(Math.random() * tétriminos.length)];
let orientationAléatoire = choixAléatoireTétrimino[Math.floor(Math.random() * choixAléatoireTétrimino.length)];

// Création du tableau de jeu 

let jeu = document.querySelector("#jeu");
let tableauJeu = [];

for (let i = 0; i < 20; i++) {
    tableauJeu[i] = [];
    let ligne = document.createElement('div');
    ligne.classList.add('ligne');
    for (let j = 0; j < 10; j++) {
        let cellule = document.createElement("div");
        cellule.style.width = '20px';
        cellule.style.height = '20px';
        cellule.style.border = '1px solid rgba(0, 0, 0, 0.5)';
        cellule.style.display = 'inline-block';
        ligne.appendChild(cellule);
        tableauJeu[i][j] = cellule;
    }
    jeu.appendChild(ligne);
};

// Placement du tétrimino 

let positionDépart = { x: Math.floor((10 - orientationAléatoire[0].length) / 2), y: 0 };
let x = positionDépart.x;
let y = positionDépart.y;

function départ() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1) {
                tableauJeu[y + i][x + j].style.backgroundColor = 'black';
            }
        }
    }
};

// Dessiner, nettoyer et modifier le tétrimino

let orientationIndex = Math.floor(Math.random() * choixAléatoireTétrimino.length);
function nettoyerTétrimino() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1 && tableauJeu[y + i] && tableauJeu[y + i][x + j]) {
                tableauJeu[y + i][x + j].style.backgroundColor = 'white';
            }
        }
    }
};

function dessinerTétrimino() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1 && tableauJeu[y + i] && tableauJeu[y + i][x + j]) {
                tableauJeu[y + i][x + j].style.backgroundColor = 'black';
            }
        }
    }
};

function changerOrientation(e) {
    if (e.key === "ArrowUp") {
        let nouvelIndexOrientation = (orientationIndex + 1) % choixAléatoireTétrimino.length;
        let nouvelleOrientation = choixAléatoireTétrimino[nouvelIndexOrientation];
        
        nettoyerTétrimino();
        if (peutTenirDansOrientation(nouvelleOrientation)) {
            orientationIndex = nouvelIndexOrientation;
            orientationAléatoire = nouvelleOrientation;
            dessinerTétrimino();
        } else {
            dessinerTétrimino(); // Redessine l'orientation actuelle si la nouvelle ne peut pas tenir
        }
    }
};

function peutTenirDansOrientation(orientation) {
    for (let i = 0; i < orientation.length; i++) {
        for (let j = 0; j < orientation[i].length; j++) {
            if (
                orientation[i][j] === 1 &&
                (
                    x + j >= 10 || x + j < 0 ||
                    y + i >= 20 || y + i < 0 ||
                    tableauJeu[y + i][x + j].style.backgroundColor === 'black'
                )
            ) {
                return false;
            }
        }
    }
    return true;
};

// Déplacements

    // Droite

function déplacerTétriminoDroite(e) {
    if (e.key === "ArrowRight") {
        if (peutSeDéplacerDroite()) {
            nettoyerTétrimino();
            x += 1;
            dessinerTétrimino();
        }
    }
};

function peutSeDéplacerDroite() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (
                orientationAléatoire[i][j] === 1 &&
                (
                    x + j + 1 >= 10 ||
                    (tableauJeu[y + i][x + j + 1].style.backgroundColor === 'black' && orientationAléatoire[i][j + 1] !== 1)
                )
            ) {
                return false;
            }
        }
    }
    return true;
};

    // Gauche

function déplacerTétriminoGauche(e) {
    if (e.key === "ArrowLeft") {
        if (peutSeDéplacerGauche()) {
            nettoyerTétrimino();
            x -= 1;
            dessinerTétrimino();
        }
    }
};

function peutSeDéplacerGauche() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1 && 
               (x + j - 1 < 0 || 
                (tableauJeu[y + i][x + j - 1].style.backgroundColor === "black" && orientationAléatoire[i][j - 1] !== 1))
            ) {
                return false;
            }
        }
    }
    return true;
};

    // Bas

function déplacerTétriminoBas(e) {
    if (e.key === "ArrowDown"){
        if (peutSeDéplacerBas()) {
            nettoyerTétrimino();
            y += 1;
            dessinerTétrimino();
            enregistrerPosition();
        }
    }
};

function peutSeDéplacerBas() {
    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1) {
                if (y + i + 1 >= 20 ||
                    (tableauJeu[y + i + 1][x + j] && tableauJeu[y + i + 1][x + j].style.backgroundColor === "black" && (!orientationAléatoire[i + 1] || orientationAléatoire[i + 1][j] !== 1))
                ) {
                    return false;
                }
            }
        }
    }
    return true;
};

// Enregistrement de la position du tétrimino quand il est arrivé en bas

function enregistrerPosition() {
    let tétriminoArrivéEnBas = false;

    for (let i = 0; i < orientationAléatoire.length; i++) {
        for (let j = 0; j < orientationAléatoire[i].length; j++) {
            if (orientationAléatoire[i][j] === 1) {
                // Vérification si le tétrimino a atteint le bas du tableau ou une autre pièce
                if (y + i === 19 || (tableauJeu[y + i + 1][x + j].style.backgroundColor === "black" && (!orientationAléatoire[i + 1] || orientationAléatoire[i + 1][j] !== 1))) {
                    tétriminoArrivéEnBas = true;
                    break;
                }
            }
        }
        if (tétriminoArrivéEnBas) break;
    }
    if (tétriminoArrivéEnBas) {
        let lignesComplètes = détecterLignesComplètes();
        if (lignesComplètes.length > 0) {
            supprimerEtDécalerLignes(lignesComplètes);
        };
        // Réinitialisation pour un nouveau tétrimino
        choixAléatoireTétrimino = tétriminos[Math.floor(Math.random() * tétriminos.length)];
        orientationAléatoire = choixAléatoireTétrimino[Math.floor(Math.random() * choixAléatoireTétrimino.length)];
        positionDépart = { x: Math.floor((10 - orientationAléatoire[0].length) / 2), y: 0 };
        x = positionDépart.x;
        y = positionDépart.y;
        départ();
    }
};

// Descente automatique du tétrimino

function descenteTétriminoAutomatique() {
    if (peutSeDéplacerBas()) {
        nettoyerTétrimino();
        y += 1;
        dessinerTétrimino();
        enregistrerPosition();
    } else {
        // Génération d'un nouveau tétrimino
        choixAléatoireTétrimino = tétriminos[Math.floor(Math.random() * tétriminos.length)];
        orientationAléatoire = choixAléatoireTétrimino[Math.floor(Math.random() * choixAléatoireTétrimino.length)];
        positionDépart = { x: Math.floor((10 - orientationAléatoire[0].length) / 2), y: 0 };
        x = positionDépart.x;
        y = positionDépart.y;
        départ();
        
        // Vérification si le tétrimino tient en haut du tableau de jeu
        if (!peutTenirDansOrientation(orientationAléatoire)) {
            clearInterval(interval); 
            alert("\"La défaite, ce n'est qu'une leçon de plus pour préparer une victoire future.\" - Paulo Coelho");
            if (confirm("Voulez-vous relancer une partie ?")) {
                location.reload();
            }
        }
    }
};

// Lignes complètes

function détecterLignesComplètes() {
    let lignesÀSupprimer = [];
    for (let i = 0; i < 20; i++) {
        let ligneComplète = true;
        for (let j = 0; j < 10; j++) {
            if (tableauJeu[i][j].style.backgroundColor !== 'black') {
                ligneComplète = false;
                break;
            }
        }
        if (ligneComplète) {
            lignesÀSupprimer.push(i);
        }
    }
    return lignesÀSupprimer;
};

function supprimerEtDécalerLignes(lignesÀSupprimer) {
    for (let i of lignesÀSupprimer) {
        for (let j = 0; j < 10; j++) {
            tableauJeu[i][j].style.backgroundColor = 'white';
        }
    }
    for (let i of lignesÀSupprimer) {
        for (let j = i; j >= 1; j--) {
            for (let k = 0; k < 10; k++) {
                tableauJeu[j][k].style.backgroundColor = tableauJeu[j-1][k].style.backgroundColor;
            }
        }
    }
};



// Actions

window.addEventListener('keydown', changerOrientation);
window.addEventListener('keydown', déplacerTétriminoDroite);
window.addEventListener('keydown', déplacerTétriminoGauche);
window.addEventListener('keydown', déplacerTétriminoBas);
départ();
enregistrerPosition();
let interval = setInterval(descenteTétriminoAutomatique, 1500);