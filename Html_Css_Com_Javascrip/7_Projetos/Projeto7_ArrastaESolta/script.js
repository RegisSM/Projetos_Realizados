/* comandos importantes utilizado neste projeto:
    
    comando novo do html:
        *draggable= 'true' => informa ao html q este elemento pode ser arrastado.
    
    comando em css:
        *cursor: grab; => cursor de puxar item

    comandos em js:
        *Target => mostra 'exatamente' a div principal onde tem um evento de click.
        *Current Target => mostra a div local onde tem algum evento, mas não informa a div
         exata que esta acontecendo o evento. 
        *dragstart => evento que inicia se manter o mouse precionado e arrasta-lo
        *dragend =>  inicia se soltar o evento que estava precionado.
*/

//===================== Projeto Arrasta e solta =====================

// objeto para armazenamento das areas 
let areas = {
    a: null,
    b: null,
    c: null
}

// Lista de eventos:

    document.querySelector('.neutralArea').addEventListener('click',(e)=>{
        console.log('Usando o Target: ',e.target);
        console.log('Utilizando o Current Target: ', e.currentTarget);
    });
    // Evento que percorre tds os itens:
    document.querySelectorAll('.item').forEach((item)=>{
    // evento que inicia se manter o mouse precionado e arrasta-lo
        item.addEventListener('dragstart',dragStart); 
        // evento que iniciara se soltar que estava precionado.
        item.addEventListener('dragend',dragEnd);
    });
    // Evento que percorre tds as areas de resposta disponiveis:
    document.querySelectorAll('.area').forEach(area => {
        //inicia se o item arrastando estiver no local onde o evento foi add no caso é na div 'area
        area.addEventListener('dragover',dragOver);
        //inicia, se o item selecionado sair de dentro de 'uma' div:'area'(local de drop), mas para fucionar deve-se estar com o mouse precionado.
        area.addEventListener('dragleave',dragLeave);
        area.addEventListener('drop',drop);
    });

    //Eventos para receber os drop nas zonas de sua origem
    document.querySelector('.neutralArea').addEventListener('dragover',dragOverNeutral);
    document.querySelector('.neutralArea').addEventListener('dragleave',dragLeaveNeutral);
    document.querySelector('.neutralArea').addEventListener('drop',dropNeutral);
//========================================================================

// Funções que usam um evento como paramentro. Relaciona com a div item 
    function dragStart(e){
        e.currentTarget.classList.add('dragging'); // add a opacidade na div q sera clicada, para simular que esta sendo usada
    }
    function dragEnd(e){
        e.currentTarget.classList.remove('dragging'); // remove a opacidade na div
    }
//=========================================================================


// Funções que relacionam com a div area do html onde ficara as respostas:
//Estas funções, tem como objetivo envia os drop para a div de respostas
function dragOver(e){
    if (e.currentTarget.querySelector('.item') === null){ // necessario para não ativar a a sobra em cima do item existente. 
        // o comportamento da função é negar q outra função seja execultada ao mesmo tempo,
        // logo o comando abaixo libera o drop para ser execultando em sequencia.
        e.preventDefault(); 
        console.log('passou por cima do local onde é aceito');
        e.currentTarget.classList.add('hover'); // Informa a area que inicio o evento
    }
}
function dragLeave(e){
    console.log('Você acabou de sair de uma area de drop');
    e.currentTarget.classList.remove('hover'); 
}
function drop(e){
    console.log('Drop realizado com sucesso!');
    e.currentTarget.classList.remove('hover');

    // localiza o item que estiver com a class dragging. Sera usado para move-la

    console.log(e.currentTarget);
    //A verificação abaixo não deixara o usuario preecher uma caixinha que esteja outro item
    if (e.currentTarget.querySelector('.item') === null){
        let dragItem= document.querySelector('.item.dragging');
        console.log(dragItem);
        // pega o item e seleciona a area que deseja jogar
        // logo, o appendChild entra dentro do elemento e add um item no final
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}
//=========================================================================


//Funções realiconadas com a div neutralArea. 
//Estas funções, tem como objetivo retorna os drop a div de orgin
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e){
    e.currentTarget.classList.remove('hover'); // remove
    let dragItem = document.querySelector('.item.dragging'); // localiza
    e.currentTarget.appendChild(dragItem); //add na div
    updateAreas();
}

// Funções vai trabalhar a logica de programação da resposta correta no drop:
function updateAreas(){
    document.querySelectorAll('.area').forEach(area=>{ // loop para varrer cada opcao 
        let name = area.getAttribute('data-name'); // guarda um atributo para localizar o item dentro da area

        if(area.querySelector('.item')!== null){ // verfica se tem um item dentro da div area 
            // preocura o item dentro do objeto areas e em seguida guarda  o item na na varival
            areas[name] = area.querySelector('.item').innerHTML; //logo, sera printado o conteúdo que esta no item 
        }
        else{
            areas[name]= null;
        }
    });
    console.log(areas);
    if(areas.a === '1' && areas.b === '2' && areas.c ==='3'){
        document.querySelector('.areas').classList.add('correct');
    }else{
        document.querySelector('.areas').classList.remove('correct');
    }

}