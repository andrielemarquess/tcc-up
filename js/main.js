import { mostrarPagina } from './navegacao.js';
import { fazerLogin, verificarLogin } from './auth.js';
import { abrirDetalhes, fecharModal } from './modal.js';
import { enviarFormulario } from './form.js';

// BOTÕES MENU
document.getElementById("btnRegistro")
    .addEventListener("click", () => mostrarPagina('registro'));

document.getElementById("btnLogin")
    .addEventListener("click", () => mostrarPagina('login'));

document.getElementById("btnPublicar")
    .addEventListener("click", () => {
        if(!verificarLogin()){
            alert("Faça login primeiro!");
            mostrarPagina('login');
        } else {
            mostrarPagina('publicar');
        }
    });

// LOGIN
document.querySelector("#login form")
    .addEventListener("submit", (e)=>{
        e.preventDefault();
        fazerLogin();
        mostrarPagina('home');
    });

// FORMULÁRIOS
document.querySelector("#registro form")
    .addEventListener("submit", (e)=>enviarFormulario(e,"Registrado!"));

document.querySelector("#publicar form")
    .addEventListener("submit", (e)=>enviarFormulario(e,"TCC publicado!"));

// MODAL FECHAR
document.querySelector(".fechar")
    .addEventListener("click", fecharModal);

// CARDS (exemplo)
document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click", ()=>{
        abrirDetalhes(
            "Título exemplo",
            "Descrição exemplo",
            "Autor",
            "Orientador",
            "2024",
            "UPP"
        );
    });
});
