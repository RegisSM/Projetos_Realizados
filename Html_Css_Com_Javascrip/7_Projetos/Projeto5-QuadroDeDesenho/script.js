//Projeto Desenhando no canvas
/* Objetivos de  alguns comandos:
target=> aponta para o elemento que será encontrado. 
getAttribute => target=> pega o elemento informado.
screen.getContext('2d')=> informa que ira utilizar 2d
*/


//Variáveis iniciais
let CorAtual = 'black';
let tela = document.querySelector('#tela');
let contexto = tela.getContext('2d');
let PodeDesenhar = false; // variavel de controle
let mouseY = 0;
let mouseX = 0;
//Eventos
document.querySelectorAll('.colorArea .color').forEach(item=>{
    item.addEventListener('click', EventClickDeCor);
});
tela.addEventListener('mousedown', mouseClicado);
tela.addEventListener('mousemove', mousePrecionado);
tela.addEventListener('mouseup', mouseSolto);
document.querySelector('.clear').addEventListener('click', limparTela);
//funções 
function EventClickDeCor(e){ // paramentro 'e' é utilizado para pegar um elemento na div
    let cor = e.target.getAttribute('data-color');
    CorAtual = cor;
    
    document.querySelector('.color.active').classList.remove('active'); // remove o que estava
    e.target.classList.add('active'); // era add no que for clicado
}

function mouseClicado(e){
    console.log('mouse clicado');  
    PodeDesenhar= true;
    /*  offsetLeft=> propriedade que tem td elemnto html
    o offsetLeft  informa qual a distancia do proprio 
    elemento, em relação ao fim da pagina*/
    mouseX = e.pageX - tela.offsetLeft; // posição inicial atualizada corretamente
    mouseY = e.pageY - tela.offsetTop;
}
function mousePrecionado(e){ 
/*
    o paramentro 'e' sera utilizado para pegar 
    o evento referente posição do mouse  
*/  if (PodeDesenhar){
        desenhar(e.pageX, e.pageY);
        
    }
}

function mouseSolto(){
    console.log('mouse Solto');
    PodeDesenhar= false;
}

function desenhar(x,y){
    let PontoX= x - tela.offsetLeft;
    let PontoY= y - tela.offsetTop; 
    console.log(PontoX,PontoY);
    //A seguir sera apresentado alguns comandos para que o desenho aconteça
    
    contexto.beginPath();//Incia o comando da linha
    contexto.lineWidth = 5; // largura da linha
    contexto.lineJoin ='round'; // linha com aparência de um circulo
    contexto.moveTo(mouseX,mouseY); // a linha seguira a posição do mouse 
    contexto.lineTo(PontoX,PontoY); // Começa a linha apartir do click presionado
    contexto.closePath(); // Termina o comando de linha
    contexto.strokeStyle= CorAtual; // cor da linha
    contexto.stroke();// finaliza o processo de cor

  
  // os comando abaixo salva a posição atual nas variaveis
  // e vai guardando as  informações para os proximos acontecimento
    mouseX = PontoX; 
    mouseY = PontoY;
   
}
function limparTela(){
    contexto.setTransform(1, 0, 0, 1, 0, 0);
    contexto.clearRect(0,0, contexto.canvas.width, contexto.canvas.height);//limpa o retangulo
    console.log('Limpo!');
}