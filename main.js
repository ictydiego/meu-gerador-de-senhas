// Seleciona os elementos necessários
let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let tamanhoDaSenha = document.querySelector("#valor");
let Senha = document.querySelector("#password");
let containerPalavraChave = document.querySelector("#containerPalavraChave");
let letrasNumeCaracEsp = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!/!@#$%&*()_';
let novaSenha = '';

tamanhoDaSenha.innerHTML = sliderElement.value;

// Atualiza o valor do span ao mudar o input range
sliderElement.oninput = function() {
  tamanhoDaSenha.innerHTML = this.value;
}

function gerarSenha() {
  let SenhaGerada = '';
  for(let i = 0, n = letrasNumeCaracEsp.length; i < sliderElement.value; ++i) {
    SenhaGerada += letrasNumeCaracEsp.charAt(Math.floor(Math.random() * n));
  }
  containerPalavraChave.classList.remove("hide");
  Senha.innerHTML = SenhaGerada;
  novaSenha = SenhaGerada;
}

function copyPassword() {
  navigator.clipboard.writeText(novaSenha).then(() => {
    alert('Senha copiada para a área de transferência!');
  });
}

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-add');
const tarefas = document.querySelector('.senhas');
const inputSenha = document.querySelector('.inputSenha');

btnTarefa.addEventListener('click', () => {
  if (!inputTarefa.value || !inputSenha.value) return alert("Todos os campos devem estar preenchidos");
  criaTarefa(inputTarefa.value, inputSenha.value);
});

inputTarefa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputTarefa.value && inputSenha.value) {
    criaTarefa(inputTarefa.value, inputSenha.value);
  }
});

function criaLi() {
  return document.createElement('li');
}

function criaP() {
  return document.createElement('p');
}

function limpaInput() {
  inputTarefa.value = '';
  inputSenha.value = '';
  inputTarefa.focus();
}

function criaTarefa(textoInput, senhaInput) {
  const li = criaLi();
  const p = criaP();
  p.innerText = senhaInput;
  li.classList.add('senhasLi');
  li.innerText = textoInput;
  li.appendChild(p);
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

function criaBotaoApagar(li) {
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.classList.add('Apagar');
  li.appendChild(botaoApagar);
}

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('Apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = Array.from(liTarefas).map((tarefa) => ({
    nome: tarefa.firstChild.nodeValue.trim(),
    senha: tarefa.querySelector('p').innerText.trim()
  }));
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefasJSON = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefasJSON) || [];
  listaDeTarefas.forEach((tarefa) => criaTarefa(tarefa.nome, tarefa.senha));
}

//Exibir as senhas salvas atraves da senha fornecida.
const containerExibir = document.querySelector('.container');
const spanCadeado = document.querySelector('.cadeado');
const spanCadeado2 = document.querySelector('.cadeado2');
function Exibir() {
  if(containerExibir.classList.contains('hide')){
    const number = prompt("Digite sua senha ");
    if(number === "1234"){
      containerExibir.classList.toggle('hide');
      spanCadeado2.classList.remove('hide');
      spanCadeado.classList.add('hide');
    }  
  }else{
    containerExibir.classList.toggle('hide');
    spanCadeado2.classList.add('hide');
    spanCadeado.classList.remove('hide');
    }
  }

adicionaTarefasSalvas();
