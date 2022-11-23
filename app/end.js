// const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
// const mostRecentScore = localStorage.getItem('mostRecentScore');
const jugadorActual = JSON.parse(localStorage.getItem('jugadorActual'));
const nameJugador = document.querySelector("#name");

const highScores = JSON.parse(localStorage.getItem('highScores'));

// listar solo 5
// const MAX_HIGH_SCORES = 5;

finalScore.innerText = jugadorActual.score;
nameJugador.innerHTML = jugadorActual.name;

// nivel DE FUERZA
if (jugadorActual.score >= 100) {
    Swal.fire({
        title: "¡Felicitaciones!" + jugadorActual.name,
        text: "Llegaste al nivel YODA",
        imageUrl: '../img/yoda.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}

if (jugadorActual.score > 60 && jugadorActual.score <100) {
    Swal.fire({
        title: "¡Felicitaciones!" + jugadorActual.name,
        text: "Llegaste al nivel MAESTRO JEDI",
        imageUrl: '../img/caballero.JPG',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}

if (jugadorActual.score >30 && jugadorActual.score <= 60) {
    Swal.fire({
        title: "¡Felicitaciones!" + jugadorActual.name,
        text: "Llegaste al nivel CABALLERO JEDI",
        imageUrl: '../img/caballerojedi.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}

if (jugadorActual.score > 0 && jugadorActual.score <=30) {
    Swal.fire({
        title: "¡Felicitaciones!" + jugadorActual.name,
        text: "Llegaste al nivel PADAWAN",
        imageUrl: '../img/padawan.JPG',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}


// guardar score
saveHighScore = (e) => {
    e.preventDefault();

    highScores.push(jugadorActual);
    highScores.sort((a, b) => b.score - a.score);
    // highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../screems/highscores.html');
    };

