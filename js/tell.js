document.addEventListener("DOMContentLoaded", function() {
    // --- Função de formatação ---
    function formatarTelefone(input) {
        let valor = input.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.substring(0, 11);

        if (valor.length === 11) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length >= 7) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else {
            valor = valor.replace(/^(\d*)$/, '($1');
        }

        input.value = valor;
    }

    // --- Função que aplica a máscara a um campo específico ---
    function aplicarMascara(input) {
        if (!input.hasAttribute("data-mascara-ok")) {
            input.addEventListener("input", function() {
                formatarTelefone(input);
            });
            input.setAttribute("data-mascara-ok", "true");
        }
    }

    // --- Função que tenta aplicar a máscara em todos os campos ---
    function verificarCampos() {
        const campos = [
            document.getElementById("whats"),
            document.getElementById("popup-whats"),
            document.getElementById("telefone_celular"),
            document.getElementById("telefone_fixo")
        ];

        campos.forEach(campo => {
            if (campo) aplicarMascara(campo);
        });
    }

    // Aplica logo de cara (para o campo do formulário)
    verificarCampos();

    // Fica de olho no DOM (para quando o pop-up aparecer)
    const observer = new MutationObserver(() => verificarCampos());
    observer.observe(document.body, { childList: true, subtree: true });
});
