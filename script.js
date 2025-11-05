// Lista de horários disponíveis
const horariosDisponiveis = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// Elementos do DOM
const selectHorario = document.getElementById("horario");
const dataInput = document.getElementById("data");
const form = document.getElementById("form-agendamento");
const mensagem = document.getElementById("mensagem");

// Atualiza os horários disponíveis ao mudar a data
if (selectHorario && dataInput) {
  dataInput.addEventListener("change", () => {
    const dataSelecionada = dataInput.value;
    const hoje = new Date();
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    const horariosOcupados = agendamentos
      .filter(a => a.data === dataSelecionada)
      .map(a => a.horario);

    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';

    horariosDisponiveis.forEach(horario => {
      const dataHora = new Date(`${dataSelecionada}T${horario}:00`);

      // Verifica se o horário já passou
      const horarioJaPassou = dataHora < hoje;

      // Verifica se o horário já está ocupado
      const horarioOcupado = horariosOcupados.includes(horario);

      if (!horarioJaPassou && !horarioOcupado) {
        const option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;
        selectHorario.appendChild(option);
      }
    });
  });
}

// Valida e salva o agendamento
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    const dataHoraSelecionada = new Date(`${data}T${horario}:00`);
    const agora = new Date();

    if (dataHoraSelecionada < agora) {
      mensagem.innerText = "Não é possível agendar para um horário que já passou.";
      return;
    }

    const agendamento = { nome, telefone, email, data, horario };
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    mensagem.innerText = "Agendamento confirmado com sucesso!";
    form.reset();
    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
  });
}