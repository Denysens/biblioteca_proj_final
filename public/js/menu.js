function abrir_menu() {
    const menu = document.getElementById("menu_oculto");
    const principal = document.getElementById("principal");

    menu.style.width = "300px";
    principal.style.marginLeft = "300px";

    // Acessibilidade
    menu.setAttribute("aria-hidden", "false");
    document.getElementById("btn_abrir").setAttribute("aria-expanded", "true");
}

function fechar_menu() {
    const menu = document.getElementById("menu_oculto");
    const principal = document.getElementById("principal");

    menu.style.width = "0";
    principal.style.marginLeft = "0";

    // Acessibilidade
    menu.setAttribute("aria-hidden", "true");
    document.getElementById("btn_abrir").setAttribute("aria-expanded", "false");
}

// Torna as funções globais
window.abrir_menu = abrir_menu;
window.fechar_menu = fechar_menu;