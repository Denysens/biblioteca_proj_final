function renderizar_livros(livros) {
    const tipo = sessionStorage.getItem("tipo");
    const cards = document.getElementById('cards-livros');
    cards.innerHTML = ""; // Limpa o conteúdo anterior

    if (livros.message) {
        cards.innerHTML = `<p>${livros.message}</p>`;
        return;
    }

    //Se não houver livros 
    if (!livros || livros.length === 0) {
        cards.innerHTML = "<p> Nenhum livro encontrado.</p>";
        return;
    }

    //Se for vários livros
    if (livros instanceof Array) {
        livros.forEach(livro => {
            const card = document.createElement('div');
            card.classList.add('card-livro'); // Adiciona a classe para estilização
            card.innerHTML = `
                <img src="${livro.imagem || 'public/default-book.jpg'}" alt="${livro.titulo} class="livro-img">
                <div class="livro-informacoes">
                    <h3 class="livro-titulo">Título: ${livro.titulo}</h3>
                    <p class="livro-autor"><strong>Autor:</strong> ${livro.autor || 'Desconhecido'}</p>
                    <p class="livro-ano"><strong>Ano:</strong> ${livro.ano_publicacao || 'Desconhecido'}</p>
                    <p class="livro-descricao"><strong>Descricao:</strong> ${livro.descricao || 'N/A'}</p>
                </div>
            `;
            if (tipo == "func") {
                card.innerHTML += `
                <div class="excluir">
                    <button class="btn-excluir" onclick="excluir_livro(${livro.id_livro})">Excluir</button>
                </div>
                <div class="botões">
                    <button onclick="emprestar_livro(${livro.id_livro})">Emprestar</button>
                    <button onclick="devolver_livro(${livro.id_livro})">Devolver</button>
                </div>`;
            }
            cards.appendChild(card);
        });

        //Se for um livro 
    } else {
        const card = document.createElement('div');
        card.classList.add('card-livro');
        card.innerHTML = `
            <img src="${livros.imagem || 'public/default-book.jpg'}" alt="${livros.titulo} class="livro-img">
            <div class="livro-informacoes">
                <h3 class="livro-titulo">${livros.titulo || 'Desconhecido'}</h3>
                <p class="livro-autor"><strong>Autor:</strong> ${livros.autor || 'Desconhecido'}</p>
                <p class="livro-ano"><strong>Ano:</strong> ${livros.ano_publicacao || 'Desconhecido'}</p>
                <p class="livro-descricao"><strong>Descricao:</strong> ${livros.descricao || 'N/A'}</p>
            </div>
        `;
        if (tipo == "func") {
            card.innerHTML += `
            <div class="excluir">
                <button class="btn-excluir" onclick="excluir_livro(${livros.id_livro})">Excluir</button>
            </div>
            <div class="botões">
                <button onclick="emprestar_livro(${livros.id_livro})">Emprestar</button>
                <button onclick="devolver_livro(${livros.id_livro})">Devolver</button>
            </div>`;
        }
        cards.appendChild(card);
    }
}

function exibir_livros() {
    fetch(`${base_url}/livros`)
        .then(res => res.json())
        .then(livros => renderizar_livros(livros))
        .catch(error => {
            console.error("Erro ao buscar Livros:", error);
        })
}

function renderizar_categorias(categorias) {
    const select = document.getElementById("categoria");
    select.innerHTML = "<option value=''>Selecione uma categoria</option>";

    if (!categorias || categorias.length === 0) {
        select.innerHTML = "<p> Nenhuma categoria encontrada.</p>";
        return;
    }

    if (categorias instanceof Array) {
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.id_categoria;
            option.textContent = categoria.nome;
            select.appendChild(option);
        })
    }
}

function exibir_categorias() {
    fetch(`${base_url}/categorias`)
        .then(res => res.json())
        .then(categorias => renderizar_categorias(categorias))
        .catch(error => {
            console.log("Erro ao carregar categorias:", error);
        });
}

function configurar_filtro() {
    const select = document.getElementById("categoria");

    // Adiciona o evento change ao <select>
    select.addEventListener("change", function () {
        const categoria_id = select.value; // Obtém o ID da categoria selecionada

        if (!categoria_id) {
            exibir_livros();
            return alert("Nenhuma categoria selecionada.")
        }

        // Faz a requisição para filtrar os livros por categoria
        fetch(`${base_url}/livros_categoria?categoria_id=${categoria_id}`)
            .then(res => res.json())
            .then(dados => renderizar_livros(dados))
            .catch(error => {
                renderizar_livros([]);
                console.log("Erro ao buscar livros:", error);
            });
    });
}

function pesquisar_livro(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const inputTitulo = document.getElementById('titulo');
    const titulo = inputTitulo.value.trim(); // Remove espaços em branco no início e no fim

    if (!titulo) {
        alert("Por favor, insira um título para a pesquisa.");
        return;
    }

    //Muda o campo de categoria para selecionar uma categoria
    const select = document.getElementById("categoria");
    select.value = "";

    fetch(`${base_url}/livros/${titulo}`)
        .then(res => res.json())
        .then(dados => renderizar_livros(dados))
        .catch(error => {
            renderizar_livros([])
            console.log("Erro ao buscar livro:", error);
        })
        .finally(() => {
            // Limpa o campo de entrada após a pesquisa
            inputTitulo.value = "";
        });
}

function formatar_data(data_string) {
    if (!data_string) return null; // Retorna null se a data for indefinida ou vazia
    const data = new Date(data_string);
    const dia = String(data.getDate()).padStart(2, '0'); // Garante 2 dígitos para o dia
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam de 0, então adiciona +1
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function renderizar_emprestimos(emprestimos) {
    const cards = document.getElementById('cards-emprestimos')
    cards.innerHTML = "";

    if (emprestimos.message) {
        cards.innerHTML = `<p>${emprestimos.message}</p>`;
        return;
    }

    if (!emprestimos || emprestimos.length === 0) {
        cards.innerHTML = "<p> Nenhum emprestimo encontrado.</p>";
        return;
    }

    if (emprestimos instanceof Array) {
        emprestimos.forEach(emprestimo => {
            const data_devolucao_prevista = formatar_data(emprestimo.data_devolucao_prevista);
            const data_devolucao = emprestimo.data_devolucao ? formatar_data(emprestimo.data_devolucao) : "Não devolvido";

            //const cpf = emprestimo.usuario_id;
            //const id_livro = emprestimo.livro_id;

            //const usuario = usuario_controller.exibir_por_cpf(cpf);
            //const livro = livro_controller.exibir_por_id(id_livro);
            // console.log(usuario, livro);

            const card = document.createElement('div');
            card.classList.add("card-emprestimo");
            card.innerHTML = `
                <div id="codigo">Código do empréstimo: ${emprestimo.id_emprestimo}</div>
                <div id="livro"> Livro: ${emprestimo.livro_id}</div> //Exibir o nome 
                <div id=""usuario> Usuario: ${emprestimo.usuario_id}</div> //Exibir o nome
                <div id="data_dev_prev">Data de devolução prevista: ${data_devolucao_prevista}</div>
                <div id="data_dev">Data de devolução: ${data_devolucao}</div>
            `;
            cards.appendChild(card);
        });
    } else {
        const data_devolucao_prevista = formatar_data(emprestimos.data_devolucao_prevista);
        const data_devolucao = emprestimos.data_devolucao ? formatar_data(emprestimos.data_devolucao) : "Não devolvido";

        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <div id="codigo">Código: ${emprestimos.id_emprestimo}</div>
            <div id="data_dev_prev">Data de devolução prevista: ${data_devolucao_prevista}</div>
            <div id="data_dev">Data de devolução: ${data_devolucao}</div>
        `;

        cards.appendChild(card);
    }
}

function exibir_emprestimos() {

    fetch(`${base_url}/emprestimos`)
        .then(res => res.json())
        .then(emprestimos => renderizar_emprestimos(emprestimos))
        .catch(error => {
            console.log("Erro ao buscar Emprestimos:", error);
            alert("Erro ao buscar Emprestimos.");
        });
}

function exibir_emprestimos_usuario() {

    fetch(`${base_url}/emprestimos_usuario`)
        .then(res => res.json())
        .then(emprestimos => renderizar_emprestimos(emprestimos))
        .catch(error => {
            console.log("Erro ao buscar Emprestimos:", error);
            alert("Erro ao buscar Emprestimos.");
        });
}

function emprestar_livro(id_livro) {
    const livro_id = id_livro;
    const usuario_id = prompt("Digite o CPF do usuário");
    const data_devolucao_prevista = new Date();
    data_devolucao_prevista.setDate(data_devolucao_prevista.getDate() + 15); // Devolução em 15 dias

    //Cadastrar emprestimo
    fetch(`${base_url}/emprestimos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            usuario_id, livro_id, data_devolucao_prevista
        }),
    })
        .then(res => res.json())
        .then(emprestimo => {
            if (emprestimo.message) {
                alert(emprestimo.message);
            }
            location.reload(); // Recarrega a página para atualizar a lista
        })
        .catch((error) => {
            console.log("Erro ao realizar empréstimo:", error);
            alert("Erro ao conectar com o servidor.");
        });
}

function devolver_livro(id_livro) {
    // Confirmação para o usuário
    if (!confirm('Deseja devolver este livro?')) return;

    // Faz uma requisição PUT ao servidor para devolver o livro
    fetch(`${base_url}/emprestimos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_livro })
    })
        .then(res => res.json())
        .then(emprestimo => {
            if (emprestimo.message) {
                alert(emprestimo.message);
            }
            location.reload(); // Recarrega a página para atualizar a lista
        })
        .catch(error => {
            console.log('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        });
}

function cadastrar_livro(event) {
    event.preventDefault();   // Impede o comportamento padrão do formulário

    // Coleta os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano_publicacao = document.getElementById('ano_public').value;
    const id_categoria = document.getElementById('categoria').value;

    // Realiza a requisição ao servidor
    fetch(`${base_url}/cadastrar_livros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, ano_publicacao, id_categoria }),
    })
        .then(res => res.json())
        .then(livros => {
            if (livros.message) {
                alert(livros.message);
            }
            location.reload();
        })
        .catch((error) => {
            console.log("Erro ao cadastrar livro:", error);
            alert("Erro ao cadastrar livro. Verifique os dados e tente novamente.");
        });
}

function excluir_livro(id_livro) {
    console.log("função exluir");
    console.log(id_livro)
    const confirmacao = confirm("Você tem certeza que deseja excluir este usuário?");
    if (confirmacao) {
        fetch(`${base_url}/livros`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_livro }),
        })
            .then(res => res.json())
            .then(livros => {
                if (livros.message) {
                    alert(livros.message);
                }
                location.reload();
            })
            .catch((error) => {
                console.log("Erro ao excluir livro:", error);
                alert("Erro ao excluir livro. Verifique os dados e tente novamente.");
            });
    }
    return
}

function renderizar_usuarios(usuarios) {

    const cards = document.getElementById('cards-usuarios');
    cards.innerHTML = "";

    if (usuarios.message) {
        cards.innerHTML = `<p>${usuarios.message}</p>`;
        return;
    }

    //Se o usuarios não exitir (indefinido = false) ele retorna pois é uuma negação 
    if (!usuarios || usuarios.length === 0) {
        cards.innerHTML = "<p> Nenhum Usuário encontrado.</p>";
        return;
    }

    //Se o usuarios for um array/ lista 
    if (usuarios instanceof Array) {
        usuarios.forEach(usuario => {
            const card = document.createElement('div');
            card.innerHTML = `
                <div id="nome"> Nome: ${usuario.nome} </div>
                <div id="telefone"> Telefone: ${usuario.telefone} </div>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal" data-cpf="${usuario.cpf}">
                Editar
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="input-caixa">
                                <input type="tel" name="telefone_modal" id="telefone_modal" placeholder="telefone">
                            </div>
                            <div class="input-caixa">
                                <input type="number" name="senha_modal" id='senha_modal' placeholder="Senha">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="editar_usuario(${usuario.cpf})">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>
            `;

            cards.appendChild(card);
        });

        // Adiciona o evento aos botões "Editar"
        document.querySelectorAll('.btn-editar').forEach(botao => {
            botao.addEventListener('click', function () {
                // Obtém os dados do botão clicado
                const cpf = this.getAttribute('data-cpf');

                // Atualiza os campos do modal com os dados do usuário
                document.getElementById('exampleModal').setAttribute('data-cpf', cpf);
            });
        });

        //Se o usuarios for apenas um objeto 
    } else {
        const card = document.createElement('div');
        card.innerHTML = `
            <div id="nome"> Nome: ${usuarios.nome} </div>
            <div id="telefone"> Telefone: ${usuarios.telefone} </div>
            <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal" data-cpf="${usuarios.cpf}">
                Editar
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="input-caixa">
                                <input type="tel" name="telefone_modal" id="telefone_modal" placeholder="telefone">
                            </div>
                            <div class="input-caixa">
                                <input type="number" name="senha_modal" id='senha_modal' placeholder="Senha">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="editar_usuario(${usuarios.cpf})">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>
        `;

        cards.appendChild(card);
        // Adiciona o evento aos botões "Editar"
        document.querySelectorAll('.btn-editar').forEach(botao => {
            botao.addEventListener('click', function () {
                // Obtém os dados do botão clicado
                const cpf = this.getAttribute('data-cpf');

                // Atualiza os campos do modal com os dados do usuário
                document.getElementById('exampleModal').setAttribute('data-cpf', cpf);
            });
        });
    }
}

function exibir_usuarios() {
    fetch(`${base_url}/usuarios`)
        .then(res => res.json())
        .then(usuarios => renderizar_usuarios(usuarios))
        .catch(error => {
            console.log("Erro ao buscar os usuarios: ", error);
            alert("Erro ao buscar usuarios");
        })
}

function pesquisar_usuario(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const inputCPF = document.getElementById('cpf');
    const cpf = inputCPF.value.trim(); // Remove espaços em branco no início e no fim

    if (!cpf) {
        alert("Por favor, insira um cpf para a pesquisa.");
        return;
    }

    fetch(`${base_url}/usuarios/cpf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf }),
    })
        .then(res => res.json())
        .then(dados => renderizar_usuarios(dados))
        .catch(error => {
            renderizar_usuarios([])
            console.log("Erro ao buscar usuario:", error);
        })
        .finally(() => {
            // Limpa o campo de entrada após a pesquisa
            inputCPF.value = "";
        });
}

function validarFormatoCPF(cpf) {
    // Regex para verificar o formato do CPF (XXXXXXXXXXX (11) apenas números)
    const regexCPF = /^\d{11}$/;
    return regexCPF.test(cpf);
}

function cadastrar_usuario(event) {
    event.preventDefault();   // Impede o comportamento padrão do formulário

    // Coleta os valores dos campos do formulário
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const data_nasc = document.getElementById("data").value || null;
    const tipo = document.getElementById('tipo').value;
    const telefone = document.getElementById('telefone').value;

    //Validar o cpf 
    if (!validarFormatoCPF(cpf)) {
        return alert("Formato de CPF inválido!");
    }

    // Realiza a requisição ao servidor
    fetch(`${base_url}/cadastrar_usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, nome, data_nasc, senha, telefone, tipo }),
    })
        .then(res => res.json())
        .then(usuarios => {
            if (usuarios.message) {
                alert(usuarios.message);
            }
            location.reload();
        })
        .catch((error) => {
            console.log("Erro ao cadastrar usuario:", error);
            alert("Erro ao cadastrar usuario. Verifique os dados e tente novamente.");
        });
}

function editar_usuario() {
    const cpf = document.getElementById('exampleModal').getAttribute('data-cpf');
    const senha = document.getElementById('senha_modal').value;
    const telefone = document.getElementById('telefone_modal').value;

    fetch(`${base_url}/usuarios`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha, telefone }),
    })
        .then(res => res.json())
        .then(usuario => {
            if (usuario.message) {
                alert(usuario.message)
            }
            location.reload();
        })
        .catch(error => {
            alert("Erro ao conectar ao servidor")
            console.log("Erro ao atualizar:", error);
        })

}
