document.addEventListener("DOMContentLoaded", () => {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {
        nome: "Aluno",
        email: "teste@email.com",
        senha: "123456", // senha fictícia
        progresso: 0
    };

    document.getElementById("nome-aluno").value = aluno.nome;
    document.getElementById("email-aluno").value = aluno.email;
    document.getElementById("senha-aluno").value = aluno.senha;
    document.getElementById("barra-progresso").value = aluno.progresso;
    document.getElementById("progresso-texto").textContent = aluno.progresso + "%";

    //simular aumento do progresso 
    document.getElementById("aumentarProgresso")?.addEventListener("click", () => {
        aluno.progresso = Math.min(aluno.progresso + 10, 100); // Máximo de 100%
        document.getElementById("barra-progresso").value = aluno.progresso;
        document.getElementById("progresso-texto").textContent = aluno.progresso + "%";
        localStorage.setItem("aluno", JSON.stringify(aluno));
    });

    verificarProgresso();
});

     // Mostrar e esconder senhar
     function alternarSenha() {
        const inputSenha = document.getElementById("senha-aluno");
        const btnOlho = inputSenha.nextElementSibling;
    
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            btnOlho.textContent = "🙈"; // senha visível
        } else {
            inputSenha.type = "password";
            btnOlho.textContent = "👁️"; // senha escondida
        }
    }

// Atualizar a barra de progresso dinamicamente
function atualizarProgreso(valor) {
    const barra = document.getElementById("barra-progresso");
    const texto = document.getElementById("progresso-texto");

    barra.value = valor;
    texto.textContent = valor + "%";

    let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    aluno.progresso = valor;
    localStorage.setItem("aluno", JSON.stringify(aluno));
}

//função para editar perfil
function alternarEdicao(editar) {
    document.getElementById("nome-aluno").disabled = !editar;
    document.getElementById("email-aluno").disabled = !editar;
    document.getElementById("senha-aluno").disabled = !editar;

    const btnSalvar = document.getElementById("btnSalvar");
    if (btnSalvar) {
        btnSalvar.style.display = editar ? "inline-block" : "none";
    }
}

// Salvar as alterações
function SalvarEdição() {
    const nomeInput = document.getElementById("nome-aluno");
    const emailInput = document.getElementById("email-aluno");
    const senhaInput = document.getElementById("senha-aluno");
    const btnSalvar = document.getElementById("btnSalvar");

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaForte = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    if (!emailValido.test(email)) {
        alert("E-mail inválido!");
        return;
    }

    if (!senhaForte.test(senha)) {
        alert("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula e um número.");
        return;
    }

    // Salvar no localStorage
    const aluno = { nome, email, senha };
    localStorage.setItem("aluno", JSON.stringify(aluno));

    // Desativa os campos e esconde o botão
    nomeInput.disabled = true;
    emailInput.disabled = true;
    senhaInput.disabled = true;
    btnSalvar.style.display = "none";

    // Mensagem de sucesso (deve aparecer)
    alert("Dados atualizados com sucesso!");
}

//Atualizar progresso manualmente (se for usado fora do botão principal)
function atualizarProgreso(valor) {
    const barra = document.getElementById("barra-progresso");
    const texto = document.getElementById("progresso-texto");

    barra.value = valor;
    texto.textContent = valor + "%";

    let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    aluno.progresso = valor;
    localStorage.setItem("aluno", JSON.stringify(aluno));
}

//Verificar progresso do módulo e exibir notificação
function verificarProgresso() {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {};

    if (aluno.progresso === 100 && !aluno.quizIniciado) {
        const notificacoes = document.getElementById("notificacoes");
        const mensagem = document.getElementById("mensagemNotificacao");

        mensagem.innerText = "🎉 Você atingiu 100% de progresso no Módulo B! Já pode fazer o quiz.";
        notificacoes.style.display = "block";
    }
}

//Fechar notificação
document.getElementById("fecharNotificacao")?.addEventListener("click", () => {
    document.getElementById("notificacoes").style.display = "none";
});