// Regras de Negócio (RN)
// Preço por Página: R$ 500,00
// Custo Adicional de Design: R$ 1.000,00
// Taxa de Urgência: 
//    - Se o prazo for menor que 5 dias: 10% sobre o valor base (páginas + design).
//    - Se o prazo for menor que 15 dias: 5% sobre o valor base (páginas + design). 
//    - Se for 15 dias ou mais, a taxa é zero.
// Desconto: O desconto percentual é aplicado sobre a soma de todos os custos únicos (páginas + design + taxa de urgência).

const rnPrecoPorPagina = 500;
const rnPrecoAdicionalDesign = 1000;

document.querySelector(".seu-nome").textContent = "Rafael Arantes";

const inputPaginas = document.querySelector("#qtd-paginas");
const inputPrazo = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const checkboxDesign = document.querySelector("#inclui-design");

(inputPaginas * 500)

qtd-paginas
prazo-entrega
desconto
inclui-design

resumo-subtotal
resumo-adicional
resumo-urgencia
resumo-desconto
resumo-total



// if (prazo-entrega =< 5){
//  (0.10 * resumo-total) + resumo-total} else 
// */}

