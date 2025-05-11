document.addEventListener("DOMContentLoaded", () => {
    inicializarProgresso();
    atualizarStatusDosModulos();
});

function inicializarProgresso() {
    if (!localStorage.getItem("aluno")) {
        const progressoPadrao = {
            modulos: {
                basico: { concluido: false, liberado: true },
                intermediario: { concluido: false, liberado: false },
                avancado: { concluido: false, liberado: false },
            }
        };
        localStorage.setItem("aluno", JSON.stringify(progressoPadrao));
    }
}

function atualizarStatusDosModulos() {
    const aluno = JSON.parse(localStorage.getItem("aluno"));

    const btnIntermediario = document.getElementById("btn-intermediario");
    const btnAvancado = document.getElementById("btn-avancado");

    if (btnIntermediario) {
        btnIntermediario.disabled = !aluno.modulos.intermediario?.liberado;
    }

    if (btnAvancado) {
        btnAvancado.disabled = !aluno.modulos.avancado?.liberado;
    }
}

function carregarModulo(modulo) {
    fetch('/paginas/modulos/basico.html')
    .then(response => {
            if (!response.ok) throw new Error("Erro no carregamento");
            return response.text();
        })
        .then(html => {
            document.getElementById("modulo-container").innerHTML = html;
            localStorage.setItem("moduloAtual", modulo);
        })
        .catch(error => {
            console.error("Erro ao carregar módulo:", error);
            document.getElementById("modulo-container").innerHTML = "<p>Erro ao carregar o módulo. Tente novamente.</p>";
        });
}


function concluirModulo(moduloAtual) {
    const aluno = JSON.parse(localStorage.getItem("aluno"));

    if (!aluno.modulos[moduloAtual]) {
        aluno.modulos[moduloAtual] = { concluido: false, liberado: true };
    }

    if (aluno.modulos[moduloAtual].pontuacao >= 70) {
        aluno.modulos[moduloAtual].concluido = true;

        if (moduloAtual === "basico") {
            aluno.modulos.intermediario = {
                ...(aluno.modulos.intermediario || {}),
                liberado: true
            };
        } else if (moduloAtual === "intermediario") {
            aluno.modulos.avancado = {
                ...(aluno.modulos.avancado || {}),
                liberado: true
            };
        }

        localStorage.setItem("aluno", JSON.stringify(aluno));
        alert(`Parabéns! Módulo "${moduloAtual}" concluído. Próximo liberado.`);
        location.reload();
    } else {
        alert("Você precisa atingir pelo menos 70% no quiz para concluir este módulo.");
    }
}