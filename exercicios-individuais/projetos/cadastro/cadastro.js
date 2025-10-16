let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

// ELEMENTOS
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltar = document.querySelector("#btn-voltar-lista");

// INPUTS USUÁRIOS
const inputId = document.querySelector("#user-id");
const inputNome = document.querySelector("#user-nome");
const inputSobrenome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-email");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputNumero = document.querySelector("#user-numero");
const inputComplemento = document.querySelector("#user-complemento");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");

let idEmEdicao = null;

const formTitulo = document.querySelector("#form-titulo");
const btnBuscarCep = document.querySelector("#btn-buscar-cep");

const inputBusca = document.querySelector("#user-busca");

// FUNÇÕES
function mostrarTelaLista(){
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
    form.reset();
}

function mostrarTelaCadastro(editar = false){
    telaLista.classList.add("d-none");
    telaCadastro.classList.remove("d-none");
    formTitulo.textContent = editar === true ? "Editar Usuário" : "Adicionar Novo Usuário";
}

function salvarUsuario(){

    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const cep = inputCep.value;
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;

    const usuario = {
        id: id || Date.now(),
        nome, sobrenome, email, cep, rua, numero, complemento, bairro, cidade, estado, obs
    }

    if (idEmEdicao){
        const index = usuarios.findIndex(user => user.id === idEmEdicao); //Se localiza, retorna a posição, caso contrário retorna -1
        if (index !== -1){
            usuarios[index] = usuario;
        }
    } else{
        usuarios.push(usuario);
    }
    salvarNoStorage();
    mostrarTelaLista();
    idEmEdicao = null;
    form.reset();
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios));
}

function editarUsuario(id){
    const user = usuarios.find(user => user.id === id); //Find traz os objetos - Filter traz todo o Array, então precisaria ser user[0].id
    if (!user) return;

    idEmEdicao = id; //user.id
    
    inputId.value = user.id;
    inputNome.value = user.nome;
    inputSobrenome.value = user.sobrenome;
    inputEmail.value = user.email;
    inputCep.value = user.cep;
    inputRua.value = user.rua;
    inputNumero.value = user.numero;
    inputComplemento.value = user.complemento;
    inputBairro.value = user.bairro;
    inputCidade.value = user.cidade;
    inputEstado.value = user.estado;
    inputObs.value = user.obs;

    mostrarTelaCadastro(true);

}

function excluirUsuario(id){
    if(confirm("Você tem certeza que deseja excluir esse usuário?")){
        //console.log(id);
        usuarios = usuarios.filter(user => user.id !== id);
        salvarNoStorage();
        renderizarTabela();
    }
}

function renderizarTabela(){
    tabelaCorpo.innerHTML = "";
    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>
                <button class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

// NO CONSOLE DO NAVEGADOR - FICA SALVO ATÉ ATUALIZAR A PÁGINA
// sessionStorage.setItem("teste", "Rafael")
// undefined
// sessionStorage.getItem("teste")
// 'Rafael'

// NO CONSOLE DO NAVEGADOR - FICA SALVO ATÉ VOCÊ DELETAR
// localStorage.setItem("teste", "Rafael")
// undefined
// localStorage.getItem("teste")
// 'Rafael'

async function buscarCep(){
    const cep = inputCep.value.replace(/\D/g,"");

    if (cep.length === 8){

        try{
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

            const dados = await resposta.json();

            if (!dados.error){
                //console.log(dados);
                inputRua.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.estado;
            }else{
                alert("CEP Inválido! Tente novamente!");
            }

        } catch (error){
            alert("Erro ao buscar CEP, verifique o número e tente novamente!");
            console.log(error);
        }


    }else{
        alert("CEP Inválido! Por favor, digite um CEP com 8 digitos.");
    }

}

function buscarUsuario(){
    //.toLowerCase = Deixa tudo em minusculo
    //.trim = Apaga espaços em branco no início e no final/
    const textoBusca = inputBusca.value.toLowerCase().trim();
    if (textoBusca.length === 0){
        renderizarTabela();
        return;
    }

    const usuariosFiltrados = usuarios.filter(user =>{
        return user.nome.includes(textoBusca) || user.sobrenome.includes(textoBusca) || user.email.includes(textoBusca); 
    });
    renderizarTabela();
}

function inicializacao(){
    btnAdicionar.addEventListener("click", mostrarTelaCadastro);
    btnVoltar.addEventListener("click", mostrarTelaLista);
    btnBuscarCep.addEventListener("click", buscarCep);

    form.addEventListener("submit", salvarUsuario);

    inputBusca.addEventListener("input", buscarUsuario);

    tabelaCorpo.addEventListener("click", (event) =>{
        const target = event.target.closest("button");
        //console.log(target);
        if (!target) return; //Se existe um botão
        
        const id = Number(target.dataset.id);
        //getAtributte("data-id");

        if (isNaN(id)) return; //Se o id é numérico

        if (target.classList.contains("btn-danger")){
            excluirUsuario(id);
        } else if(target.classList.contains("btn-warning")){
            editarUsuario(id);
        }

    });

    mostrarTelaLista();
}

inicializacao();