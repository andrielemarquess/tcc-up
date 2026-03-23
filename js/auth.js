let usuarioLogado = false;

export function fazerLogin(){
    usuarioLogado = true;
    alert("Login realizado!");
}

export function verificarLogin(){
    return usuarioLogado;
}
