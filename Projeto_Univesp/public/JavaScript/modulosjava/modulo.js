let tempoRestante = 20;
const contadorElemento = document.getElementById('contador');
const botaoAvancar = document.getElementById('botaoAvancar');

const intervalo = setInterval(() => {
  tempoRestante--;
  contadorElemento.textContent = `Aguarde ${tempoRestante} segundos para liberar o botão...`;

  if (tempoRestante <= 0 ) {
    clearInterval(intervalo);
    contadorElemento.textContent = "Você pode iniciar o quiz!";
    botaoAvancar.disabled = false;
  }
}, 1000);

botaoAvancar.addEventListener('click', () => {
  window.location.href = 'quizB.html';
});