const draggables = document.querySelectorAll('.draggable'); // Todos os elementos arrastáveis
const dropzone = document.querySelector('#dropzone'); // Zona de drop
const favoritos = document.querySelector('#fav');
const favCount = document.querySelector('#favCount');

let elementoArrastado = null; // Para saber qual está sendo arrastado

function atualizarFavoritos() {
  const total = dropzone.querySelectorAll('.draggable').length;
  favCount.textContent = total;
}


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
    atualizarFavoritos();
    console.log('Elemento solto na área de drop');
  }
});
dropzone.addEventListener('click', (event) =>{ // Adiciona um evento de click
  let imagem = event.target.parentElement; // Pega a div do elemento que esta sendo clicado ("target" pega o elemento, no caso a div, pq a img está dentro da div, "parentElement" pega um nível acima)
// Pega a div .draggable relacionada ao elemento clicado.
// "event.target" é o elemento exato clicado (ex: a <img> dentro da div),
// "parentElement" sobe um nível (no caso, chega na div .draggable).
// OBS: se clicar fora da imagem (target), parentElement será o container da dropzone, e pode não funcionar.

  let galeria = document.querySelector('#imagens'); // Aqui ele seleciona a div imagens, da galeria principal

  if(imagem.classList.contains('draggable')){ // SE a imagem que eu peguei, contém o draggable
    galeria.appendChild(imagem); // a galeria vai adicionar um filho da imagem
    atualizarFavoritos();
  }
})




// Apenas para rolar a tela para baixo
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
