document.getElementById('sortear').addEventListener('click', function() {
    const opcoes = document.querySelectorAll('#lista-opcoes li');
    
    if (opcoes.length === 0) {
        alert('Não há opções para sortear!');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    const vencedor = opcoes[indiceAleatorio].textContent;

    document.getElementById('resultado').textContent = `O date de hoje é: ${vencedor}`;
});


function addGoal() {
    const goalInput = document.getElementById("newGoal").value;
    if (goalInput) {
        const goalList = document.getElementById("goalsList");

        const goal = document.createElement("div");
        goal.classList.add("goal");
        goal.innerHTML = `
            <input type="checkbox" onclick="markAsDone(event)">
            <span>${goalInput}</span>
        `;

        goalList.appendChild(goal);
        
        document.getElementById("newGoal").value = '';

        makeDraggable(goal);
    }
}

function markAsDone(event) {
    const goal = event.target.parentElement;
    if (event.target.checked) {
        goal.style.textDecoration = "line-through";
    } else {
        goal.style.textDecoration = "none";
    }

}


const cardValues = ['Seu sorriso', 'Sua boca', 'Seus cachinhos', 'Seu senso de humor', 'Sua inteligência', 'Suas orelhinhas', 'Seu corpo', 'Sua parceria'];
let cards = [...cardValues, ...cardValues];
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = [];

function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
    return;
  }

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(() => {
      if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards.push(flippedCards[0], flippedCards[1]);
      } else {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
      }
      flippedCards = [];
    }, 1000);
  }
}

cards.forEach(value => {
  const card = createCard(value);
  gameBoard.appendChild(card);
});