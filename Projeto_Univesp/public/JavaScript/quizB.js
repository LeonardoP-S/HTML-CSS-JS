let quizFinalizado = false;

function sairDoQuiz() {
    const totalPerguntas = 8;
    let pontuacao = 0;
    const respostasCorretas = {
        q1: "b", q2: "c", q3: "d", q4: "c",
        q5: "c", q6: "d", q7: "a", q8: "b"
    };

    for (let i = 1; i <= totalPerguntas; i++) {
        const resposta = document.querySelector(`input[name="q${i}"]:checked`);
        if (!resposta) {
            alert("Você não respondeu todas as perguntas.");
            return;
        }
        if (resposta.value === respostasCorretas[`q${i}`]) {
            pontuacao++;
        }
    }

    const percentual = Math.round((pontuacao / totalPerguntas) * 100);
    alert(`Você acertou ${pontuacao} de ${totalPerguntas}. Pontuação: ${percentual}%.`);

    const modulo = "basico";

    let aluno = JSON.parse(localStorage.getItem("aluno")) || {
        modulos: {
            basico: { concluido: false, liberado: true },
            intermediario: { concluido: false, liberado: false },
            avancado: { concluido: false, liberado: false }
        }
    };

    aluno.modulos[modulo] = {
        ...aluno.modulos[modulo],
        quizConcluido: true,
        pontuacao: percentual,
        liberado: true,
        concluido: percentual >= 70
    };

    if (modulo === "basico" && percentual >= 70) {
        aluno.modulos.intermediario = {
            ...aluno.modulos.intermediario,
            liberado: true
        };
        alert("Parabéns! O módulo intermediário foi desbloqueado.");
    }

    // Salva com segurança antes de redirecionar
    localStorage.setItem("aluno", JSON.stringify(aluno));
    quizFinalizado = true;

    // Redireciona com atraso mais seguro
    setTimeout(() => {
        window.location.href = "/paginas/ensino.html";
    }, 1000);
}

window.onbeforeunload = function () {
    if (!quizFinalizado) {
        return "Tem certeza que deseja sair? Suas respostas podem ser perdidas.";
    }
};