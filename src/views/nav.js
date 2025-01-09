class Nav extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const nav = document.getElementById("nav");
        nav.innerHTML = `
        <!--Menu oculto-->
        <div id="menu_oculto" aria-hidden="true">
            <a href="/home_comum">Home</a>
            <a href="/empres_user/views">Meus empréstimos </a>
            <a href="/login">Sair</a>
            <button id="btn_fechar" aria-label="Fechar menu" onclick="fechar_menu()">Fechar</button>
        </div>

        <section id="principal">
            <button id="btn_abrir" aria-label="Abrir menu" onclick="abrir_menu()">Abrir</button>
        </section>

        <!--Titulo-->
        <h1 id="title">Portal do Saber</h1>

        <!--Barra de Pesquisa-->
        <form>
            <div class="input-caixa">
                <input type="text" name="titulo" id="titulo" placeholder="Digite o livro procurado">
            </div>
            <button class="pesquisa-button" onclick="pesquisar_livro()"> Buscar</button>
        </form>
        `;
        this.appendChild('nav');
    }
}
customElements.define("nav-bar", Nav);