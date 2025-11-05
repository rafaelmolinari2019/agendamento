function login(event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "admin" && senha === "1234") {
    localStorage.setItem("logado", "true");
    window.location.href = "admin-agenda.html";
  } else {
    document.getElementById("mensagem").innerText = "Usuário ou senha inválidos.";
  }
}