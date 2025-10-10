
// 2. Requisitos de Funcionalidade (O que fazer no viagem.js)
// Cálculo em Tempo Real: O cálculo dos custos deve ser refeito e os resultados na tela devem ser atualizados instantaneamente sempre que o usuário alterar o valor de qualquer um dos campos do formulário.
// Lógica Organizada: Seu código JavaScript deve ser organizado em funções especialistas:
// Crie funções "puras" e separadas para cada cálculo principal (ex: uma função para calcular o custo do combustível, outra para o custo por pessoa).
// Essas funções devem receber os dados que precisam via parâmetros e devolver o resultado com return.
// Crie uma função principal (a "orquestradora") que será chamada pelos eventos. A responsabilidade dela é ler os valores da tela, chamar as funções de cálculo e, por fim, atualizar a interface com os resultados.

// Fórmulas Necessárias
// Litros Necessários = Distância Total / Consumo do Veículo
// Custo Total Combustível = Litros Necessários * Preço do Combustível
// Custo por Pessoa = Custo Total Combustível / Número de Viajantes

document.querySelector(".seu-nome").textContent = "Rafael Arantes";

const inputDistancia = document.querySelector("#distancia-km");
const inputKmLitro = document.querySelector("#km-litro");
const inputPreco = document.querySelector("#preco-combustivel");
const inputViajantes = document.querySelector("#num-viajantes");

const resumoTotal = document.querySelector("#resumo-total");
const resumoPorPessoa = document.querySelector("#resumo-pessoa");


function realizarConta(){
const distancia = Number(inputDistancia.value);
const kmLitro = Number(inputKmLitro.value);
const preco = Number(inputPreco.value);
const viajantes = Number(inputViajantes.value);

const litrosNecessario = distancia / kmLitro;
const custoCombustivelTotal = preco * litrosNecessario;
const custoPorPessoa = custoCombustivelTotal / viajantes;


const formatarValores = (valor) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL" 
    })
}

resumoTotal.textContent = formatarValores(custoCombustivelTotal);
resumoPorPessoa.textContent = formatarValores(custoPorPessoa);

}

const todosInputs = [inputDistancia, inputKmLitro, inputPreco, inputViajantes];

todosInputs.forEach(input => {
    input.addEventListener('input', realizarConta);
});

document.addEventListener('DOMContentLoaded', realizarConta);