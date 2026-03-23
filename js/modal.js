// js/modal.js
export function abrirModal(tcc) {
    const modal = document.getElementById('modal');
    document.getElementById('titulo').innerText = tcc.titulo;
    document.getElementById('descricao').innerText = tcc.descricao;
    document.getElementById('autor').innerText = tcc.autor;
    document.getElementById('orientador').innerText = tcc.orientador;
    document.getElementById('data').innerText = tcc.data;
    document.getElementById('instituicao').innerText = tcc.instituicao;
    modal.style.display = 'flex';
}

export function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}
