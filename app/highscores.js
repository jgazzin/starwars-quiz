const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// nivel de Fuerza
function agregarNivel (highScores) {
  let nivel = "";
    highScores.forEach(jugador => {
      console.log(jugador.score)
      // calificar nivel
      if (jugador.score > 0 && jugador.score <=30) {
        nivel = "Padawan";
      }
      if (jugador.score >30 && jugador.score <= 60) {
        nivel = "Caballero Jedi";
      }
      if (jugador.score > 60 && jugador.score <100) {
        nivel = "Maestro Jedi";
      }
      if (jugador.score == 100 || jugador.score > 100) {
        nivel = "YODA";
      }
      console.log(nivel)
    })

  return nivel;
}

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score} - ${agregarNivel(highScores)}</li>`;
  })
  .join("");

function resetear() {
  console.log("limpiar")
  highScores.forEach(jugada => {
    console.log(jugada)
    highScores.splice(jugada);
  });
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('../screems/highscores.html');
}
