const draggables = document.querySelectorAll('.draggable'); // Todos os elementos arrastáveis
const dropzone = document.querySelector('#dropzone'); // Zona de drop
let elementoArrastado = null; // Para saber qual está sendo arrastado

// Para cada imagem (div .draggable)
draggables.forEach(draggable => {

  draggable.addEventListener('dragstart', (event) => {
    elementoArrastado = draggable; // Guarda qual está sendo arrastado
    draggable.classList.add('dragging');
    console.log('Drag iniciado');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    console.log('Drag finalizado');
  });

});

dropzone.addEventListener('dragenter', (event) => {
  event.preventDefault();
  dropzone.classList.add('over');
  console.log('Entrou na área de drop');
});

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  console.log('Elemento sobre a área de drop');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('over');
  console.log('Saiu da área de drop');
});

dropzone.addEventListener('drop', () => {
  dropzone.classList.remove('over');

  if (elementoArrastado) {
    dropzone.appendChild(elementoArrastado); // Move a imagem para os favoritos
    console.log('Elemento solto na área de drop');
  }
});




let scrollInterval = null;

window.addEventListener("dragover", function(event) {
    const mouseY = event.clientY;
    const windowHeight = window.innerHeight;

    const threshold = 150; // distância do topo/rodapé que ativa o scroll
    const scrollSpeed = 6; // velocidade suave

    clearInterval(scrollInterval);

    if (mouseY < threshold) {
        scrollInterval = setInterval(() => window.scrollBy(0, -scrollSpeed), 10);
    } 
    else if (mouseY > windowHeight - threshold) {
        scrollInterval = setInterval(() => window.scrollBy(0, scrollSpeed), 10);
    }
});

window.addEventListener("dragend", () => {
    clearInterval(scrollInterval);
});
