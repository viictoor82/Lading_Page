// Classes de Perguntas
/* herança foi aplicada para reutilizar o codigo e estabelecer hierarquia
entre as classes perguntas, perguntamultipla e perguntaverdadeirofalso
com a classe perguntas sendo a classe base*/

class Perguntas {
    constructor(pergunta, respostaCorreta) {
        this.pergunta = pergunta;
        this.respostaCorreta = respostaCorreta;
    }
}
class PerguntaMultipla extends Perguntas {
    constructor(pergunta, respostaCorreta, respostaErrada1, respostaErrada2, respostaErrada3) {
        super(pergunta, respostaCorreta);
        this.respostas = [respostaCorreta, respostaErrada1, respostaErrada2, respostaErrada3];
        this.misturarRespostas();
    }
    misturarRespostas() {
        this.respostas.sort(() => Math.random() - 0.5);
    }
}
/* O Construtor com super() foi utilizado na classe PerguntaVerdadeiroFalso*/
class PerguntaVerdadeiroFalso extends Perguntas {
    constructor(pergunta, respostaCorreta) {
        super(pergunta, respostaCorreta);
        this.respostas = ["Verdadeiro", "Falso"];
    }
}

// inserir e remover perguntas
/* O polimorfismo foi aplicado no array perguntas_e_respostas pois 
contém diferentes tipos de perguntas (pergunta de multipla escolha
e pergunta de verdadero ou falso */
const perguntas_e_respostas = [
    new PerguntaMultipla("Qual a capital do Brasil?", "Brasília", "Rio de Janeiro", "São Paulo", "Salvador"),
    new PerguntaVerdadeiroFalso("O céu é azul?", "Verdadeiro"),
    new PerguntaMultipla("Qual o maior planeta do sistema solar?", "Júpiter", "Terra", "Marte", "Vênus"),
    new PerguntaMultipla("Quem escreveu 'Dom Quixote'?", "Miguel de Cervantes", "Machado de Assis", "José de Alencar", "Fernando Pessoa"),
    new PerguntaMultipla("Qual é o elemento químico com o símbolo 'O'?", "Oxigênio", "Hidrogênio", "Carbono", "Nitrogênio"),
    new PerguntaVerdadeiroFalso("A água ferve a 100 graus Celsius?", "Verdadeiro"),
    new PerguntaMultipla("Qual o país em que se localiza Machu Picchu?", "Peru", "Brasil", "Bolívia", "Colômbia")
];

// Classe que gerencia a pontuação
/* o encapsulamento foi utilizado na classe gerenciadorpontuacao para
 controlar o armazenamento da pontuacao*/
class GerenciadorPontuacao {
    constructor() {
        this.pontos = 0;
    }
    adicionarPontos(valor) {
        this.pontos += valor;
    }
    resetar() {
        this.pontos = 0;
    }
}

//global
const gerenciador = new GerenciadorPontuacao(); 

// Elementos do DOM
const iniciar_quiz_button = document.querySelector('.iniciar-quiz');
const perguntas_quiz_container = document.querySelector('.perguntas-container');
const perguntas_texto = document.querySelector('.pergunta-texto');
const respostas_quiz = document.querySelector('.respostas-container');
const corretor = document.querySelector('.corretor'); 
const ponto_texto = document.querySelector('.pontuacao-texto');

const secao_inicio = document.querySelector('.secao-inicio');
const ranking_container = document.querySelector('.ranking-container');
const nome_jogador_input = document.getElementById('nomeJogador');
const lista_ranking_ul = document.getElementById('listaRanking');
const ver_rank_button = document.querySelector('.ver-rank');
const voltar_inicio_button = document.querySelector('.voltar-inicio');

let currentQuestionIndex = 0;
let nomeJogadorAtual = '';

// Event Listeners
iniciar_quiz_button.addEventListener("click", iniciar_quiz);
ver_rank_button.addEventListener("click", mostrar_ranking);
voltar_inicio_button.addEventListener("click", voltar_para_inicio);

// Funções

//função que inicia o quiz
function iniciar_quiz() {
    nomeJogadorAtual = nome_jogador_input.value.trim(); //pega o nome do usuario

    if (nomeJogadorAtual === "") {//verifica se o campo do nome foi preenchido
        alert("Por favor, digite seu nome para iniciar o quiz."); //Não permite ao usuario iniciar um quiz sem por um nome
        return;
    }

    secao_inicio.classList.add('hide'); //esconde a interface 
    perguntas_quiz_container.classList.remove('hide'); //mostra as perguntas
    
    currentQuestionIndex = 0;
    gerenciador.resetar(); // Usa o método da classe para 
    corretor.innerText = ''; 
    ponto_texto.innerHTML = `Pontuação: ${gerenciador.pontos}`; // Usa a propriedade da classe
    
    proxima_pergunta(); //inicia a função proxima pergunta
}

function proxima_pergunta() {// Essa funçao inicia a proxima
    limpar();
    if (currentQuestionIndex >= perguntas_e_respostas.length) {
        return finalizar();
    }
    mostrar_pergunta(perguntas_e_respostas[currentQuestionIndex]);
    currentQuestionIndex++;
}

function limpar() { //limpa a tela
    perguntas_texto.innerText = '';
    respostas_quiz.innerHTML = '';
    corretor.innerText = '';
}

function mostrar_pergunta(pergunta) { // função para mostra a pergunta
    perguntas_texto.innerText = pergunta.pergunta;

    let respostas = pergunta.respostas;
    respostas.forEach(resposta => {
        const respostaElemento = document.createElement('div');
        respostaElemento.classList.add('resposta');
        respostaElemento.innerText = resposta;
        respostaElemento.addEventListener('click', () => verificar_resposta(resposta, pergunta.respostaCorreta));
        respostas_quiz.appendChild(respostaElemento);
    });
}

function verificar_resposta(respostaSelecionada, respostaCorreta) {
    
    const respostaElements = document.querySelectorAll('.resposta');
    respostaElements.forEach(element => {
        element.style.pointerEvents = 'none';// Desabilita novas respostas
    });
    //verifica se a resposta está correta
    if (respostaSelecionada === respostaCorreta) {
        corretor.innerText = "Correto!";
        corretor.style.color = "green";
        
        gerenciador.adicionarPontos(10); // Usa o método da classe
        ponto_texto.innerHTML = `Pontuação: ${gerenciador.pontos}`; // Usa a propriedade da classe
        
    } else {
        corretor.innerText = `Incorreto! A resposta correta é: ${respostaCorreta}`;
        corretor.style.color = "red";
    }

    setTimeout(proxima_pergunta, 1000);
}

function finalizar() {
    // Usa a propriedade da classe para a pontuação final
    ponto_texto.innerHTML = `Sua Pontuação Final Foi ${gerenciador.pontos}!`;
    
    //salva a pontuacao
    salvar_pontuacao(nomeJogadorAtual, gerenciador.pontos); // Passa a pontuação da classe
    
    secao_inicio.classList.remove('hide');
    perguntas_quiz_container.classList.add('hide');
    nome_jogador_input.value = '';
}

// Funções doRanking
function salvar_pontuacao(jogador, pontuacaoFinal) {
    const ranking = JSON.parse(localStorage.getItem('quizRanking') || '[]');//obtem o rank do armazena local
    
    ranking.push({ jogador: jogador, pontuacao: pontuacaoFinal }); //adiciona a nova pontuação
    ranking.sort((a, b) => b.pontuacao - a.pontuacao); //ordena o rank por pontuação
    
    const topRanking = ranking.slice(0, 10); //armazena apenas os 10 melhores
    
    localStorage.setItem('quizRanking', JSON.stringify(topRanking)); //salva o rank atualizado
}

function mostrar_ranking() {
    secao_inicio.classList.add('hide'); //esconde a interface
    perguntas_quiz_container.classList.add('hide');
    ranking_container.classList.remove('hide');

    const ranking = JSON.parse(localStorage.getItem('quizRanking') || '[]'); //obtem o rank do armazenamento local
    
    lista_ranking_ul.innerHTML = ''; //limpa o rank

    if (ranking.length === 0) {
        lista_ranking_ul.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>'; //caso nao tenha pontuação
        return;
    }

    ranking.forEach((item, index) => {
        const listItem = document.createElement('li');
        let medalha = ''; //armazena a medalha
        if (index === 0) medalha = '🥇';
        else if (index === 1) medalha = '🥈';
        else if (index === 2) medalha = '🥉';
        else medalha = `${index + 1}.`;

        listItem.innerHTML = `<span>${medalha} ${item.jogador}</span><span>${item.pontuacao} Pontos</span>`;
        lista_ranking_ul.appendChild(listItem); // adiciona ao ranking
    });
}

function voltar_para_inicio() {
    ranking_container.classList.add('hide'); //esconde o ranking
    perguntas_quiz_container.classList.add('hide');
    secao_inicio.classList.remove('hide'); //mostra a interface
}