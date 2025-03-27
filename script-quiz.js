function verificarResposta() {
    const chute = document.getElementById("chute").value;
    const resultado = document.getElementById("resultado");

    if (chute) {
        resultado.innerHTML = `Errou, diva! Eu te amo &#x221e;<sup>&#x221e;</sup>`;
    } else {
        resultado.textContent = "Se tu não digitar um número, não vai saber a resposta! Se manca, ovo mole!";
    }
}