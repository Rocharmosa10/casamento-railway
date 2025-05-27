document.addEventListener("DOMContentLoaded", async () => {
    let response = await fetch("/static/data/presentes.json");
    let data = await response.json();

    // Armazena globalmente os dados para reutilização
    window.listaPresentes = data.presentes;

    carregarCategorias(data.presentes);
    carregarPresentes(data.presentes[0].categoria, data.presentes);
});

function carregarCategorias(listaCategorias) {
    let menu = document.getElementById("menu-categorias");
    menu.innerHTML = "";
    listaCategorias.forEach(categoria => {
        let btn = document.createElement("button");
        btn.innerText = categoria.categoria;
        btn.classList.add("categoria-btn");
        btn.onclick = () => carregarPresentes(categoria.categoria, listaCategorias);
        menu.appendChild(btn);
    });
}

function carregarPresentes(categoriaSelecionada, listaCategorias) {
    let lista = document.getElementById("lista-presentes");
    lista.innerHTML = "";
    document.getElementById("compra").classList.add("escondido");
    document.getElementById("confirmacao").classList.add("escondido");

    let categoria = listaCategorias.find(cat => cat.categoria === categoriaSelecionada);
    if (categoria) {
        categoria.itens.forEach(presente => {
            let item = document.createElement("div");
            item.classList.add("presente");
            item.innerHTML = `
                <img src="/static/${presente.imagem}" alt="${presente.nome}">
                <p><strong>${presente.nome}</strong></p>
                <p><strong>R$ ${presente.valor}</strong></p>
                <button class="botao" onclick="selecionarPresente('${categoriaSelecionada}', '${presente.nome}')">Presentear</button>
            `;
            lista.appendChild(item);
        });
    }
}

// ✅ Corrigido: passa apenas categoria e nome, busca o objeto correto depois
function selecionarPresente(categoriaSelecionada, nomePresente) {
    document.getElementById("lista-presentes").innerHTML = "";
    document.getElementById("compra").classList.remove("escondido");

    // Encontra o objeto do presente selecionado
    const categoria = window.listaPresentes.find(cat => cat.categoria === categoriaSelecionada);
    const presente = categoria.itens.find(item => item.nome === nomePresente);

    // ✅ Atualiza os campos com base no objeto real
    document.getElementById("presente-selecionado").innerText = presente.nome;
    document.getElementById("imagem-presente").src = `/static/${presente.imagem}`;
    document.getElementById("imagem-presente").alt = presente.nome;
    document.getElementById("valor").innerText = presente.valor;
    document.getElementById("chave-pix").innerText = presente.Pix;
}

function finalizarCompra() {
    let nomePresente = document.getElementById("presente-selecionado").innerText;
    let valor = document.getElementById("valor").innerText;
    let chavePix = document.getElementById("chave-pix").innerText;
    let recado = document.getElementById("recado").value;

    fetch("/finalizar_presente/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({
            nome: nomePresente,
            valor: valor,
            chave_pix: chavePix,
            recado: recado
        })
    }).then(response => {
        if (response.ok) {
            document.getElementById("compra").classList.add("escondido");
            document.getElementById("confirmacao").classList.remove("escondido");

            // Código adicionado para mostrar o botão e permitir cópia
            const chavePix = document.getElementById("chave-pix").innerText; // pega a chave Pix
            const botaoCopiar = document.getElementById("copiar-pix"); // pega o botão copiar

            if (chavePix.trim() !== "") { // se a chave pix não for vazia
                botaoCopiar.style.display = "inline-block"; // mostra o botão copiar
                botaoCopiar.onclick = function() { // adiciona ação no clique
                    navigator.clipboard.writeText(chavePix).then(function() {
                    botaoCopiar.innerText = "Copiado!"; // muda texto do botão
                    setTimeout(() => {
                        botaoCopiar.innerText = "Copiar"; // volta para "Copiar" depois de 2s
                    }, 2000);
                }, function() {
                    alert("Erro ao copiar a chave Pix."); // mensagem de erro se falhar
                });
            };
        }
        } else {
            alert("Houve um erro. Tente novamente.");
        }
    });
}

function recarregarPresentes() {
    location.reload(); // Recarrega tudo para voltar ao estado inicial
}

// Função utilitária para pegar o CSRF do Django
function getCSRFToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}