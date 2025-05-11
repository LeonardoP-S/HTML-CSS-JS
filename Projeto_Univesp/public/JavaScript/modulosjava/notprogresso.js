let tempoRestante = 20;
const contadorElemento = document.getElementById('contador');
const botaoAvancar = document.getElementById('botaoAvancar');
const barraProgresso = document.getElementById('barra-progresso');
const progressoTexto = document.getElementById('progresso-texto');
const noticacoes = document.getElementById('noticacoes');
const mensagemNotificacao = document.getElementById('mensagemNotificacao');
const fecharNotificacao = document.getElementById('fecharNotificacao');

let progresso = 0;
barraProgresso.value = progresso;

const atualizarProgresso = () => {
  progresso = (20 - tempoRestante) * 5;
  barraProgresso.value = progresso;
  noticacoes.style.display = 'block';
};

fecharNotificacao.addEventListener('click', () => {
    noticacoes,style.display = 'none';
});

const intervalo = setInterval(() => {
    tempoRestante--;
    contadorElemento.textContent = `Aguarde ${tempoRestante} segundos para liberar o botão...`;
    
    atualizarProgresso();

    if (tempoRestante <= 0) {
        clearInterval(intervalo);
        contadorElemento.textContent = "Você pode iniciar o quiz!";
        botaoAvancar.disabled = false;

        mostrarNotificacao("O tempo acabo, Você agora pode iniciar o quiz");
    }
}, 1000);

botaoAvancar.addEventListener('click', () => {
   window.location.href = "quizBhtml";
});