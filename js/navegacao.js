export function mostrarPagina(pagina){
    const paginas = ['home','registro','login','publicar'];

    paginas.forEach(p => {
        const el = document.getElementById(p);
        if(el){
            el.style.opacity = 0;
            setTimeout(() => el.style.display = 'none', 500);
        }
    });

    setTimeout(() => {
        const mostrar = document.getElementById(pagina);
        mostrar.style.display = (pagina === 'home') ? 'grid' : 'block';
        setTimeout(() => mostrar.style.opacity = 1, 50);
    }, 500);
}
