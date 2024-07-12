/* aca va el rotador de opiniones */
document.addEventListener('DOMContentLoaded', () => {
    const comments = [
        {
            author: 'Roger Medina',
            text: 'Tienen un buen servicio<br>y las cotizaciones son correctas',
            image: 'img/imagen_comentario.jpg'
        },
        {
            author: 'Maria Fernandez',
            text: 'Muy buena atención<br>y rapidez en la respuesta.',
            image: 'img/imagen_comentario.jpg'
        },
        {
            author: 'Juan Pérez',
            text: 'Las tasas de cambio<br>son muy competitivas.',
            image: 'img/imagen_comentario.jpg'
        }
    ];

    let currentIndex = 0;

    const authorElement = document.getElementById('comment-author');
    const textElement = document.getElementById('comment-text');
    const imageElement = document.getElementById('comment-image');

    const rotarComen = () => {
        currentIndex = (currentIndex + 1) % comments.length;
        const { author, text, image } = comments[currentIndex];

        authorElement.textContent = author;
        textElement.innerHTML = text;
        imageElement.src = image;
    };

    setInterval(rotarComen, 3000); // Cambia la opinión cada 5 segundos
});
