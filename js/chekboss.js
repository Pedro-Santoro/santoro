
document.addEventListener("DOMContentLoaded", () => {
    const todas = document.getElementById("todas");
    const checkboxes = document.querySelectorAll(".operadora-check:not(#todas)");
    const operadorasSection = document.querySelector(".operadoras-section");

    // Marca/desmarca todas
    todas.addEventListener("change", () => {
        checkboxes.forEach(chk => chk.checked = todas.checked);
        operadorasSection.classList.toggle("active-group", todas.checked);
    });

    // Atualiza "Todas" se usuário mexer manualmente
    checkboxes.forEach(chk => {
        chk.addEventListener("change", () => {
            todas.checked = [...checkboxes].every(c => c.checked);
            operadorasSection.classList.toggle("active-group", todas.checked);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const radioSim = document.getElementById("cnpjSim");
  const radioNao = document.getElementById("cnpjNao");
  const campoCNPJ = document.getElementById("campoCNPJ");
  const inputCNPJ = document.getElementById("cnpjNumero");

  // Mostra/esconde o campo conforme a escolha
  function atualizarCampo() {
    campoCNPJ.style.display = radioSim.checked ? "block" : "none";
    if (!radioSim.checked) inputCNPJ.value = ""; // limpa se marcar "Não"
  }

  radioSim.addEventListener("change", atualizarCampo);
  radioNao.addEventListener("change", atualizarCampo);

  // Máscara automática de CNPJ
  inputCNPJ.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // só números
    if (valor.length > 14) valor = valor.slice(0, 14);

    // aplica formatação
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d{4})(\d)/, ".$1/$2-$3");

    e.target.value = valor;
  });

  // Validação simples
  document.querySelector("form").addEventListener("submit", (e) => {
    if (radioSim.checked) {
      const cnpj = inputCNPJ.value.replace(/\D/g, "");
      if (cnpj.length !== 14) {
        e.preventDefault();
        alert("Por favor, insira um CNPJ válido com 14 dígitos.");
        inputCNPJ.focus();
      }
    }
  });
});
