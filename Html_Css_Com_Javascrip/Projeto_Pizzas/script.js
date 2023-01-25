let modalQt=1; // variavel global 
let carrinho=[]; // carrinho que guarda as pizza, qtd, tamanho, e preço
let modalKey=0; //indetifcador que indetificar qual pizza foi selecionada
const DqS = (el)=>{ return document.querySelector(el);} //guarda o queryselector
const DqSall=(el)=>document.querySelectorAll(el); //guarda o querySelectorAll


//=================================================Aula 4 5 6=============================================================================
//O codigo a abaixo é usado para fazer uma listagem das pizzas.
//pizzaJson=> contem informaçao de cada pizza
pizzaJson.map((item, index)=>{// Item=> nome da pizza, index=> numero de indetificacao do array
    let pizzaItem = DqS('.pizzas .pizzas-itens').cloneNode(true); // clona a div
    
    /*Aula 5- Aqui iremos setar um atributo como nome
    de data-key: que serve para indetificar a posicao da pizza*/
        pizzaItem.setAttribute('data-key',index);//seta um atributo
        pizzaItem.setAttribute('data-value',item.value);
    /*Fim*/
    pizzaItem.querySelector('.pizza-item--name').innerHTML=item.name;//pega o nome de cada pizza dentro do vetor
    pizzaItem.querySelector('.Tamanho-Padrao img').src=item.img;// localiza o caminho da img e pega a posicao dela no vetor
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description;
    let priceAtual= pizzaItem.querySelector('.pizza-item--price').innerHTML=item.price;
    priceAtual=priceAtual[2];
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`${priceAtual.toLocaleString('pt-br',{style:'currency',currency:'BRL'})}`;
    
        pizzaItem.querySelector('a').addEventListener('click',(e)=>{
            e.preventDefault(); //recebe um evento onde ira bloquear a tag 'a' de att
            
            /*Aula 5-6: mostra quais as informaçoes de uma pizza.
                .target=> é o "alvo" de qual elemento deve ser selecionado.
                .closest=> acha o elemento mais proximo
                .getAttribute=> pega o elemento que foi informado*/
                modalQt=1;// garante que sera 1 quando abrir esta classe
                
                let key = e.target.closest('.pizzas-itens').getAttribute('data-key');//guarda o valor da key.
                modalKey=key;//serve para guarda qual pizza vai ser add ao carrinho
               /*  console.log('Esta pizaa esta na posicao: ', key);
                console.log(pizzaJson[key]);  *///mostrar todos os objetos desta posicao
                //Agora vamos preencher as informaçoes na div:
                DqS('.pizzaBig img').src= pizzaJson[key].img; // pega a imagem da pizza.
                DqS('.pizzaInfo h1').innerHTML=pizzaJson[key].name; // pega o nome
                DqS('.pizzaInfo--descri').innerHTML=pizzaJson[key].description; // pega a descricao
                DqS('.pizzaInfo-areaDePreco .pizzaInfo-PrecoAtual').innerHTML=`${pizzaJson[key].price[2].toLocaleString('pt-br',{style:'currency',currency:'BRL'})}`; // pega a informação
                //O codigo a seguir remove a classe selected. Ou seja a classe é resetada.
                DqS('.pizzaInfo-sector-size.selected').classList.remove('selected');
                
                DqSall('.pizzaInfo-sector-size').forEach((size, sizeIndex)=>{ 
                    //size=> é o item. O sizeItem=> é a posicao: 0 pequeno, 1 medio, 2 grande.
                    
                    if(sizeIndex==2){
                        size.classList.add('selected'); // deixa sempre o tamanho grande selecionado
                    }
                    let percorre = pizzaJson[key].sizes[sizeIndex];//percorre cada posicao do vetor sizes
                    size.querySelector('span').innerHTML= percorre;

                    size.addEventListener('click', () => {
                        DqS('.pizzaInfo-sector-size.selected').classList.remove('selected');
                        size.classList.add('selected');
                        DqS('.pizzaInfo-PrecoAtual').innerHTML = `${pizzaJson[key].price[sizeIndex].toLocaleString('pt-br',{style:'currency',currency:'BRL'})}`;
                    })

                });
                DqS('.pizzaInfo-qt').innerHTML=modalQt;
            /*=============================Fim===============================*/    

            DqS('#pizzaWindowArea').style.display='flex';
            DqS('#pizzaWindowArea').style.opacity=0;
            setTimeout(() => {
                DqS('#pizzaWindowArea').style.opacity=1;
            }, 200);
            
            console.log('clicou ;)');
        
        });

    
    DqS('.pizza-area').append(pizzaItem); //add o item clonado na div pizza-area
}); 
//================================================================================================================================


//=========================================================Aula 7=====================================================================
//evento fecha carrinho de compra no mobile
function closeMobile(){
    DqS('aside').style.display='none';
}

//evento para fechar o modal
function closeModal(){//como não é um button não precisa de paramentro
    DqS('#pizzaWindowArea').style.opacity=0;
    setTimeout(()=>{
        DqS('#pizzaWindowArea').style.display='none';
    },500);
}
DqSall('.pizzaInfo--cancelButton, .pizzaInfo--CancelMobileButton ') //executa a funcao fechar modal
.forEach((elemento)=>{
        elemento.addEventListener('click',closeModal);
        
    }
);
let divFora = DqS("#pizzaWindowArea"); // fechar modal clicando fora dele
    divFora.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});
//=========================================================================================================================================


//===================================================Aula 8=========================================================================
//fazendo as ações de click
DqS('.pizzaInfo-qtMenor').addEventListener('click', (event) =>{//botao de -
if(modalQt>1){modalQt-=1;}
DqS('.pizzaInfo-qt').innerHTML=modalQt;
});
DqS('.pizzaInfo-qtdMaior').addEventListener('click', (event) => {// botao de +
modalQt+=1;
DqS('.pizzaInfo-qt').innerHTML=modalQt;
});
//acoes para os tamanhos da pizza: que vai de pequena,média e grande.
DqSall('.pizzaInfo-sector-size')
.forEach((size,sizeIndex)=>{
   size.addEventListener('click',() => { // acão de click 
        DqS('.pizzaInfo-sector-size.selected').classList.remove('selected'); //removo o item selecionado
        size.classList.add('selected');// marca o item que acabou de clicar
   });
});
//==================================================Fim=======================================================================================

//===================================================Aula 9==========================================================================
//o codigo abaixo add as funcoes ao carrinho de compra
DqS('.pizzaInfo--addButton').addEventListener('click',()=>{
   /*  qual a pizza
    console.log('a pizza add ao carriho esta na posicao',modalKey);
    qual o tamanho */
    let tamanho=Number(DqS('.pizzaInfo-sector-size.selected').getAttribute('data-key')); // o tamanho é pego pela classe data-key 
   /*  console.log('tamanho',tamanho);
    quantas pizza são
    console.log('Quantas pizza selecionadas',modalQt); */
   //====================Aula 9====================
   let identTamaPi=pizzaJson[modalKey].id+'=='+tamanho; //identfica a pizza e o tamanho referente a ela
   //o código abaixo ira verficar se o item(a pizza) ja esta no carrinho
        let VerifKey= carrinho.findIndex((item)=>{ // o findIndex=> retorna o valor da primeira posição que satisfazer a condiçã
        /*  o codigo abaixo verifica dos intificador do carrinho,
        qual tem o mesmo valor do indentificador que foi add por ultimo. */
            return item.identTamaPi==identTamaPi; //verifica se é igual
        });
        if(VerifKey>-1){
        // se encontrar uma pizza que ja foi add, o codigo abaixo ira aumentar esta qtd de pizza
          carrinho[VerifKey].quantidade+=modalQt; // aumenta a qtd de pizza do carrinho  
        } else{
            // agora vamos add os conteúdos ao carrinho
            carrinho.push({// push add conteúdo ao objeto
                identTamaPi, // informa qual o tamanho selecionado
                id:pizzaJson[modalKey].id,//pega a pizza escolhida
                size:tamanho, // informa o tamanho da pizza
                quantidade:modalQt //infoma a qtd que vai desejar add ao carrinho
            }); 
        }
//=======================================Fim========================================
        atualizaCarrinho();
 
    closeModal();//fecha
});
//===================================================================================================================================

//=======================aula 14==================================================
DqS('.menu-openner').addEventListener('click',()=>{
    
    if (carrinho.length>0){
        DqS('aside').style.display='flex';
        DqS('aside').style.left='0';
    }
});
DqS('.menu-closer').addEventListener('click',()=>{
    DqS('aside').style.left='100vw';
    atualizaCarrinho();
    DqS('aside').style.display='none';
  

});
//=======================================Aulas 11, 12, 13 e 14 ======================================
function atualizaCarrinho(){
    //==aula 14==
    DqS('.menu-openner span').innerHTML=carrinho.length; // add a qtd de pedido da div do carrinho.
    //===========
    if (carrinho.length>0){
        DqS('aside').classList.add('show');
        DqS('aside').style.display='flex';
        DqS('.container-menu .cart').innerHTML='';
        DqS('.menu-closer').addEventListener('click',()=>{
            DqS('aside').style.left='100vw';
        
        })
        //============Variaveis para calcular o valor das pizza========
        let subtotal=0;
        let desconto=0; //depende do valor do subtotal.
        let total=0; // depende do valor do desconto e do subtotal.
        //=============================================================
        for(let i in carrinho){
            //find=> retorna o primeiro item que satifazer a condição
            let LocalizaPizza = pizzaJson.find((item)=>{
                // verifica se o item do vetor for igual ao item selecionado
                return item.id === carrinho[i].id;
            });
            // Usando o subtotal para calcular de acordo com a qtd
            //varre o vetor carrinho, e salva o preço de acordo com o tamanho
            subtotal+=LocalizaPizza.price[carrinho[i].size] * carrinho[i].quantidade;
            
            let DadosCarrinho= DqS('#container .cart-item').cloneNode(true); // clona os dados do cart-item
            console.log(Number(subtotal));
            /*  DqS('.cart .cart-item').style.opacity='1'; */
            DadosCarrinho.querySelector('img').src=LocalizaPizza.img;
            let TamanhoDaPizza=carrinho[i].size;
            switch(carrinho[i].size){ // criado para transforma as posição do vetor em palavras
                case 0:
                    TamanhoDaPizza='Pequena';
                    break;
                case 1:
                    TamanhoDaPizza='Média';
                    break;
                case 2:
                    TamanhoDaPizza='Grande';
                    break;
            };
            let Concatena=`${LocalizaPizza.name}  (${TamanhoDaPizza})`; // junta dois dados
            DadosCarrinho.querySelector('.cart-item--nome').innerHTML=Concatena;
            DadosCarrinho.querySelector('.cart-item--qt').innerHTML=carrinho[i].quantidade; //busca a qtd no vetor e imprime na div
            /* console.log(carrinho); */
            //Aula 13
            DadosCarrinho.querySelector('.cart-item--qtMenor').addEventListener('click',()=>{
                if(carrinho[i].quantidade > 1){
                    carrinho[i].quantidade-=1;
                }else{
                    carrinho.splice(i,1); // remove um item do carrinho
                    // caso a a qtd seja 0
                }
                atualizaCarrinho();
            });
            DadosCarrinho.querySelector('.cart-item--qtMaior').addEventListener('click',()=>{
                carrinho[i].quantidade+=1;//add mais qtd;
                atualizaCarrinho();//precisa dessa função para atualizar a cada click que for add
                /* Aqui, na verdade ela não  entra em loop, pq o que acontece é 
                que ela atribui uma referência dela mesma para o evento de click dos botões,
                então quando ela é executada ao clicarmos neles, o que acontece é que essa 
                referência é adicionada novamente.*/
            });
            //======
           DqS('.cart').append(DadosCarrinho); // e add 1 por vez na div cart
        }
        desconto=subtotal*0.1; //desconto de 10%
        total=subtotal-desconto;// pega o valor do subtotal e subtrai pelo desconto.
        DqS('.SubTotal span:last-child').innerHTML=subtotal.toLocaleString('pt-br',{style:'currency',currency:'BRL'});
        DqS('.Desconto span:last-child').innerHTML=desconto.toLocaleString('pt-br',{style:'currency',currency:'BRL'});
        DqS('.Total span:last-child').innerHTML=total.toLocaleString('pt-br',{style:'currency',currency:'BRL'});
        DqS('.cart--finalizar').addEventListener('click',()=>{DqS('aside').style.display='none';});
    }else{
        DqS('aside').style.display='none';
        DqS('aside').classList.remove('show');
        DqS('aside').style.width='100vw';//fecha a div do carrinho
    }
}
//================================================================================================================================
