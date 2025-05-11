async function logarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('senhalogin').value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password: senha })
        });

        const data = await response.json();
        console.log("Resposta da API:", data); // 👉 VERIFICAR NO CONSOLE

        if (response.ok && data.token && data.usuario) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            alert(`Bem-vindo(a), ${data.usuario.firstName}!`);

            // Redireciona para a página correta
            window.location.href = "/paginas/index.html"; // ajuste conforme necessário
        } else {
            alert(`Erro: ${data.error || "E-mail ou senha inválidos"}`);
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

document.querySelector("form").addEventListener("submit", logarUsuario);