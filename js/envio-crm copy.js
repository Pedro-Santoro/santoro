document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-popup");
  const origemInput = document.getElementById("origem_site");

  if (!form || !origemInput) return;

  const hostname = window.location.hostname;
  const url = window.location.href;
  let redirectUrl;

  origemInput.value = hostname;

  redirectUrl =
    url.includes("santoro.planosdesaudephs.com.br") ? "https://santoro.planosdesaudephs.com.br/sucesso.html" :
    url.includes("empresa.planosdesaudephs.com.br") ? "https://empresa.planosdesaudephs.com.br/obrigado.html" :
    url.includes("saude.planosdesaudephs.com.br") ? "https://saude.planosdesaudephs.com.br/obrigado.html" :
    url.includes("clinicas.planosdesaudephs.com.br") ? "https://clinicas.planosdesaudephs.com.br/obrigado.html" :
    url.includes("planosdesaudephs.com.br") ? "https://planosdesaudephs.com.br/obrigado.html" :
    "https://planosdesaudephs.com.br/";

  // Mensagem visual
  const msg = document.createElement("div");
  msg.id = "mensagem-envio";
  msg.textContent = "Enviando seus dados...";
  Object.assign(msg.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    background: "#0d6efd",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    fontSize: "16px",
    zIndex: "9999",
    display: "none"
  });
  document.body.appendChild(msg);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    msg.style.display = "block";
    msg.textContent = "Enviando seus dados...";

    const dados = new FormData(form);

    try {
      const resposta = await fetch("https://crm.planosdesaudebrj.com.br/recebe_leads.php", {
        method: "POST",
        body: dados
      });

      // Captura o texto e remove espaços/quebras de linha
      const texto = (await resposta.text()).trim();
      console.log("Status:", resposta.status, "Texto:", texto);

      // Se for 200 e o texto for "OK" (de qualquer forma), considera sucesso
      if (resposta.ok && /^ok$/i.test(texto)) {
        msg.textContent = "Cadastro enviado com sucesso! Redirecionando...";
      } else {
        msg.textContent = "Envio realizado, redirecionando...";
      }

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);

    } catch (erro) {
      console.error("Erro no envio:", erro);
      msg.textContent = "Erro de conexão, redirecionando...";
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1200);
    }
  });
});