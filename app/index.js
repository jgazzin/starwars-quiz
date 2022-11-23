const username = document.getElementById('username');
// const jugadorActual = username.value;

// deshabilita a jugar si no se graba el nombre
username.addEventListener('keyup', () => {
    saveNameBtn.disabled = !username.value;
});

function setJugador(e) {
    e.preventDefault();

    const jugadorActual = {
        score: 0,
        name: username.value.toUpperCase(),
    };
    console.log(jugadorActual)

    // agrega a highScores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
highScores.push(jugadorActual);
highScores.sort((a, b) => b.score - a.score);
localStorage.setItem('highScores', JSON.stringify(highScores));

    // comparar datos
console.log(highScores)
highScores.forEach((user, position) => {
if (jugadorActual.name === user.name) {
    jugadorActual.score = user.score > jugadorActual.score ? user.score : jugadorActual.score;
    // borrar user
    console.log(position)
    highScores.splice(position, 1);
}
});

console.log(highScores)
console.log(jugadorActual)
    // juarda jugador actual para game
localStorage.setItem("jugadorActual", JSON.stringify(jugadorActual));
localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // voy a game.html
    window.location.assign('../screems/game.html');
}