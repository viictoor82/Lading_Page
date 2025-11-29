## Introdução

Este é um Quiz de Conhecimentos Gerais simples, construído com HTML, CSS e JavaScript. Ele demonstra a aplicação de princípios de Programação Orientada a Objetos (POO) para uma estrutura de código

## Estrutura do Projeto

- `Quiz.html`: O arquivo HTML que contém a estrutura da interface do quiz.
- `Quiz.css`: O arquivo CSS que contém os estilos para a interface do quiz.
- `Quiz.js`: O arquivo JavaScript que contém a lógica do quiz.

## Como Executar

1. **Baixe os arquivos ou clone o repositório**.
2. **Abra o arquivo `Quiz.html` em um navegador** (como Chrome, Firefox, etc.).
3. **Digite seu nome** e clique em "Iniciar Quiz" para começar.
4. Responda às perguntas e veja sua pontuação final.
5. Você pode visualizar o ranking clicando em "Ver Ranking".

## Conceitos de Programação Orientada a Objetos (POO) Aplicados

### 1. Classes e Objetos

- **Classe `Perguntas`**: Classe base que representa uma pergunta genérica. Contém propriedades como `pergunta` e `respostaCorreta`.
- **Classe `PerguntaMultipla`**: Herda de `Perguntas` e representa perguntas de múltipla escolha. Adiciona a funcionalidade de misturar as respostas.
- **Classe `PerguntaVerdadeiroFalso`**: Também herda de `Perguntas`, mas é usada para perguntas que têm apenas duas respostas possíveis: "Verdadeiro" ou "Falso".

### 2. Herança

A herança permite que as classes `PerguntaMultipla` e `PerguntaVerdadeiroFalso` reutilizem o código da classe base `Perguntas`. Isso promove a reutilização de código e a manutenção mais fácil. O uso do super() nos construtores das classes filhas (PerguntaMultipla e PerguntaVerdadeiroFalso) permite que elas reutilizem o código de inicialização da classe base Perguntas.

class Perguntas {
    constructor(pergunta, respostaCorreta) {
        this.pergunta = pergunta;
        this.respostaCorreta = respostaCorreta;
    }
}
class PerguntaMultipla extends Perguntas {
    constructor(pergunta, respostaCorreta, respostaErrada1, respostaErrada2, respostaErrada3) {
        super(pergunta, respostaCorreta);
        // ...
    }
}
class PerguntaVerdadeiroFalso extends Perguntas {
    constructor(pergunta, respostaCorreta) {
        super(pergunta, respostaCorreta);
        // ...
    }
} 

### 3. Polimorfismo

O polimorfismo é aplicado no array perguntas_e_respostas, que contém instâncias de diferentes tipos de perguntas. Isso permite que o código trate essas instâncias de maneira uniforme, chamando métodos comuns.

const perguntas_e_respostas = [
    new PerguntaMultipla("Qual a capital do Brasil?", "Brasília", "Rio de Janeiro", "São Paulo", "Salvador"),
    new PerguntaVerdadeiroFalso("O céu é azul?", "Verdadeiro"),
    // ...
];

### 4. Encapsulamento

O encapsulamento é utilizado na classe GerenciadorPontuacao, que gerencia a pontuação do jogador. As propriedades e métodos são encapsulados para que a lógica de pontuação não seja exposta diretamente.

class GerenciadorPontuacao {
    constructor() {
        this.pontos = 0; // Inicializa a pontuação do jogador
    }

    adicionarPontos(valor) {
        this.pontos += valor; // Aumenta a pontuação
    }

    resetar() {
        this.pontos = 0; // Reseta a pontuação
    }
}

### Contribuições
Sinta-se à vontade para contribuir com melhorias ou sugestões.

### Licença
Este projeto é de uso livre.