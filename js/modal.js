export function abrirDetalhes(titulo,descricao,autor,orientador,data,instituicao){
    document.getElementById("titulo").innerText = titulo;
    document.getElementById("descricao").innerText = descricao;
    document.getElementById("autor").innerText = autor;
    document.getElementById("orientador").innerText = orientador;
    document.getElementById("data").innerText = data;
    document.getElementById("instituicao").innerText = instituicao;
    document.getElementById("modal").style.display = "flex";
}

export function fecharModal(){
    document.getElementById("modal").style.display = "none";
}
