// js/main.js
import { carregarTCCs } from './tcc.js';
import { fecharModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    carregarTCCs();

    // Navegação entre páginas
    window.mostrarPagina = function(pagina) {
        const paginas = ['home','registro','login','publicar'];
        paginas.forEach(p => {
            const el = document.getElementById(p);
            if(el){
                el.style.opacity = 0;
                setTimeout(() => { el.style.display = 'none'; }, 500);
            }
        });
        setTimeout(() => {
            const mostrar = document.getElementById(pagina);
            mostrar.style.display = (pagina === 'home') ? 'grid' : 'block';
            setTimeout(() => { mostrar.style.opacity = 1; }, 50);
        }, 500);
    };

    // Campos dinâmicos do registro
    window.exibirCamposAluno = function() {
        document.getElementById('camposAluno').style.display = 'block';
        document.getElementById('camposOrientador').style.display = 'none';
    }
    window.exibirCamposOrientador = function() {
        document.getElementById('camposOrientador').style.display = 'block';
        document.getElementById('camposAluno').style.display = 'none';
    }

    // Fechar modal
    document.querySelector('.fechar').addEventListener('click', fecharModal);
});
