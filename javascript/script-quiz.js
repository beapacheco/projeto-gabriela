const respostasCorretas = {
    quiz1: "primeiro encontro",
    quiz2: "destino de viagem dos sonhos",
    quiz3: "comida favorita",
    quiz4: "maior aventura",
    quiz5: "coisa engraçada",
    quiz6: "primeiro filme",
    quiz7: "série favorita",
    quiz8: "presente memorável",
    quiz9: "música para dançar",
    quiz10: "animal de estimação",
    preguica: "Beatriz", 
    indecisa: "Gabriela",
    teimosa: "Beatriz",
    ciumenta: "Gabriela",
    brincalhona: "Beatriz",
    responsavel: "Gabriela",
    arrumar: "Beatriz",
    caseira: "Gabriela",
    romantica: "Beatriz",
    paodura: "Gabriela"
};

function calcularPontuacao(event) {
    event.preventDefault();

    let pontuacao = 0;

    for (let i = 1; i <= 10; i++) {
        let resposta = document.querySelector(`#iquiz${i}`).value.toLowerCase();
        if (resposta === respostasCorretas[`quiz${i}`].toLowerCase()) {
            pontuacao++;
        }
    }

    const radioQuestions = ["preguica", "indecisa", "teimosa", "ciumenta", "brincalhona", "responsavel", "arrumar", "caseira", "romantica", "paodura"];
    radioQuestions.forEach((question) => {
        let selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.nextElementSibling.textContent.trim() === respostasCorretas[question]) {
            pontuacao++;
        }
    });

    enviarParaServidor(pontuacao);
    
    document.getElementById('resultados').style.display = 'block';
    document.getElementById('pontuacao').innerText = `Você acertou ${pontuacao} de 20 perguntas!`;
}

function enviarParaServidor(pontuacao) {
    const data = {
        pontuacao: pontuacao
    };

    
    fetch('http://localhost:8000/quiz-extra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}

document.getElementById('quizForm').addEventListener('submit', calcularPontuacao);


function verificarResposta() {
    const chute = document.getElementById("chute").value;
    const resultado = document.getElementById("resultado");

        fetch('http://localhost:8000/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Resposta: chute })
        })
        .then(response => response.json())
        .then(data => {
            resultado.innerHTML = data.mensagem;
        })
        .catch(error => {
            console.error("Erro ao enviar a requisição:", error);
        });
    
}

function openCard(card) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => {
        if (c !== card) {
            c.classList.remove('open');
        }
    });

    card.classList.toggle('open');
}