//projeto Quiz

// 1º vamos verificar quantas questões tem 
console.log(questions.length);



//========== Dados Iniciais ==========
//variavel que guardara a questão atual
let currencyQuestion = 0;
//variavel que guardara as respostas da questão marcada
let currencyAnswers= 0;
//=========== Chamando A 1ª função
showQuestion()

// evento para repetir o quiz
document.querySelector('button').addEventListener('click',resetEvent)


//========== Funções ==================
// 1ª função: mostra as questoes diversas vezes
function showQuestion(){
    // verfica se existe alguma questão
    if (questions[currencyQuestion]){
    let q = questions[currencyQuestion];
        document.querySelector('.scoreArea').style.display="none";
        document.querySelector('.questionArea').style.display="block";
    
    // calculo do progresso que sera usado na div barra de progresso
    let pct = Math.floor((currencyQuestion / questions.length)*100);
    console.log(pct);
    document.querySelector('.progress--bar').style.width=`${pct}%`;
    
    document.querySelector('.question').innerHTML= q.Questao;  // informa apenas a questão
        /* 1ª forma de fazer:
        document.querySelector('.options').innerHTML=''; // necesssario limpar as resposta primeiro
        for (let i in q.opcoes){
           document.querySelector('.options').innerHTML+=`<div> ${q.opcoes[i]}</div>`; 
        } */
        // 2ª forma que economiza processamento
        let optionsHtml =''; //limpa antes de de iniciar
        for (let i in q.opcoes){
            // ira acomular o conteúdo dentro da div "option"
            optionsHtml+= `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.opcoes[i]} </div>`;
        }
        document.querySelector('.options').innerHTML=optionsHtml;// imprime os dados na tela
        
        // fazeremos um evento de loop para percorre as opções 
        document.querySelectorAll('.options .option').forEach(element => {
            element.addEventListener('click',optionClickEvent);
        });
    }else{
        // se entra aqui signfica que terminou as questões.
        finishiQuiz();
    }
}
// 2ª função,  usada para envento de click nas opcoes que sera informada ao usuário
function optionClickEvent(e){ // usaremos um paramentro para o evento
   /*  console.log("Clicou em:",e.target.getAttribute('data-op'));  */
    let clickedOption= Number(e.target.getAttribute('data-op'));// localiza e seleciona o atributo

    if (questions[currencyQuestion].resposta === clickedOption){
        currencyAnswers+=1;
        console.log('acerto mizerave');
    }else{
        console.log('Errou mizerave');
    }
    // independente de acerta ou não iremos para próxima pergunta
    currencyQuestion++;
    showQuestion(); //ira chamar a proxima questão
}

//3ª função
function finishiQuiz(){
    // calculando qtd de acertos
    let points = Math.floor((currencyAnswers/questions.length)*100);

    if(points<30){
       document.querySelector('.scoreText1').innerHTML=`Errou bastante, tente refazer novamente :)`;
       document.querySelector('.scorePct').style.color='red';
    }else if(points>30 && points<70){
        document.querySelector('.scoreText1').innerHTML='Muito bom!';
        document.querySelector('.scorePct').style.color='green';
    }else if(points>=70){
        document.querySelector('.scoreText1').innerHTML='Excelente!'
        document.querySelector('.scorePct').style.color='blue';
    }

    document.querySelector('.scorePct').innerHTML= `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML=`Você respondeu ${currencyQuestion} e acertou ${currencyAnswers}`

    document.querySelector('.scoreArea').style.display='block';
    document.querySelector('.questionArea').style.display='none';
    document.querySelector('.progress--bar').style.width='100%'; // leva para o maximo
}

// 4ª função resta o Quiz
function resetEvent(){
    currencyAnswers=0;
    currencyQuestion=0;
    showQuestion();
}