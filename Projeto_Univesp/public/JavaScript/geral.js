document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("aluno");//remove os dados do usuário
            alert("você saiu da conta.");
            window.location.href = "/Inicialpg/login.html";
        });
    }
});