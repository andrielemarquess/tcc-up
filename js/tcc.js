// js/tcc.js
import { abrirModal } from './modal.js';

let tccsArray = []; // Array em memória para todos os TCCs

// Carrega TCCs iniciais do JSON
export async function carregarTCCs() {
    try {
        const response = await fetch('tccs.json');
        const tccs = await response.json();
        tccsArray = tccs;
        renderizarTCCs();
    } catch (error) {
        console.error('Erro ao carregar TCCs:', error);
    }
}

// Renderiza todos os TCCs no container #home
export function renderizarTCCs() {
    const container = document.getElementById('home');
    container.innerHTML = '';

    tccsArray.forEach(tcc => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${tcc.capa || 'default-capa.jpg'}" alt="Capa do TCC: ${tcc.titulo}">
            <h3>${tcc.titulo}</h3>
            <p><strong>Autor:</strong> ${tcc.autor}</p>
            <p><strong>Orientador:</strong> ${tcc.orientador || ''}</p>
            <p class="keywords"><strong>Palavras-chave:</strong> ${tcc.palavrasChave ? tcc.palavrasChave.join(', ') : ''}</p>
            <p><strong>Área do Conhecimento:</strong> ${tcc.area || ''}</p>
            <p><strong>Data de Publicação:</strong> ${tcc.data || ''}</p>
            <a href="${tcc.arquivo}" class="btn-download" target="_blank">Baixar PDF</a>
        `;

        card.addEventListener('click', () => abrirModal(tcc));
        container.appendChild(card);
    });
}

// Adiciona um novo TCC e atualiza a tela
export function adicionarTCC(novoTCC) {
    tccsArray.push(novoTCC);
    renderizarTCCs();
}
