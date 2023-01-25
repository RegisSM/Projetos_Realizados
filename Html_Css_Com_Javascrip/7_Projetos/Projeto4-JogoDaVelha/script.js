// Dados iniciais
let quadro = { // guarda os valores de cada uma das casas
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};
let vezDoJogador='';
let alerta='';
let jogando= false; //indica se a partida começou ou não
reset(); // limpa ja quando inicia

// Eventos
document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach((item)=>{ // ira percorre cada item
    item.addEventListener('click',SelecionaItem);
});

// Funções 

function SelecionaItem(IdntfElemento){
    // o comando abaixo pega o item da div
    let GuardaItem= IdntfElemento.target.getAttribute('data-item');
    // ira verficar se o jogo esta em adamento e se tem espaço vazio
    if (jogando && quadro[GuardaItem]===''){ //percorre a funcão quadro
        quadro[GuardaItem] = vezDoJogador; // recebe o valor que foi escolhindo podendo ser 'o' ou 'x'
        preencherQuadro(); //chama a função que printa na tela
        alternaJogador();// ira alternar entre 'o' ou 'x'
    }
};
function alternaJogador(){
    if(vezDoJogador==='x'){
        vezDoJogador='o';
    }else{
        vezDoJogador='x'
    }
     preencherInfo();// esta funcao ira buscar e prencher qual é o jogador da vez, e no fim ira preencher o campo Vencedor
}
function reset(){
    alerta='';
    //floor arrendonda para baixo
    // o math.random() pega valor quebrado 0<valor<1
    let random= Math.floor(Math.random()*2); // é multiplicado por 2 subir o valor.
    vezDoJogador = (random===0)? 'x' : 'o';
    // o for ira percorrer cada um dos item 
    for (let i in quadro){
        quadro[i]=''; // irar limpar item por item
    }
    jogando=true; // indica que o jogo esta em andamento
    preencherQuadro();
    preencherInfo();
}
function preencherQuadro(){ // prenche o html se tiver em branco
    for (let i in quadro){
        // o querySelector abaixo pode ser usando de duas forma 
        // assim: `div[data-item=${i}]`
        // ou assim:
        let item= document.querySelector('div[data-item="'+i+'"]');
       /*  console.log(item); */
        if (quadro[i]!==''){
            item.innerHTML= quadro[i];
        }else{
            item.innerHTML='';
        }
    }
    verificaJogada();
};
function preencherInfo(){
    // o comando abaixo identifica qual player iniciara
    // o resultado pode ser 'o' ou 'x'
    document.querySelector('.vez').innerHTML= vezDoJogador;
    document.querySelector('.resultado').innerHTML=alerta;
};

function verificaJogada(){ // esta funcao verifica quem ganhou
    if(checaQuemGanhou('x')){
        alerta='O "x" ganhou a partida!';
        jogando = false; // finaliza o game
    }else if(checaQuemGanhou('o')){
        alerta='O "o" ganhou a partida!'
        jogando = false;
    }else if(empate()){
        alerta='Deu Empate';
        jogando= false;
    }
}
function checaQuemGanhou(vezDoJogador){
    let PosibVitoria=[
        //horizontal
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        
        //vertical
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        
        //diagonal 
        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for (let i in PosibVitoria){
        /* Observações em algum código:
            splip(',') => separa o array de acordo com o parâmetro passado.
            every => função verifica se as condições estão satisfeita, caso uma não seja, ele retorna invalido  .
        */
        let posicArray= PosibVitoria[i].split(','); // separa em a1, a2, a3
        let Ganhador=posicArray.every((opcao)=>{
            if (quadro[opcao]===vezDoJogador){ // se estiver preenchido e for igual
                return true
            }else{
                return false
            }
        })
        if (Ganhador){ // se ganhou a verifica retorta como verdadeira
            return true
        }
    }
    return false // se não achar nenhum ganhador
}
function empate(){
    for(let i in quadro){
        if(quadro[i] === ''){ // verifica se esta vazio
            return false;
        }
    }
    return true // caso esteja tudo preenchindo
}