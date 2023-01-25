/* Comandos novos que aprendi neste projeto:
    • nextElementSibling; => encontra o próximo elemento html.
*/
let seuVotoPara = document.querySelector('.d-1-1 span');  
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
// parte da lateral
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3'); // parte dos numeros

let etapaAtual = 0; // sera o indexador do vetor
let GuardaNumero = ''; // limpa o numero q vir antes
let VerificaBranco=false; // Usada para verificaçao do voto branco
let GuardaVotos= [];
function ComecaEtapas(){ // limpa tela e pega as informaçoes da etapa e preenche as informaçoes necessarais
    let etapa = etapas[etapaAtual]; // busca dentro do jason
        /* console.log(etapa); */
        cargo.innerHTML= etapa.titulo;
        GuardaNumero=''; // é zerado. Sera muito util no botão corrige
    let numeroHTML='';
        VerificaBranco=false; //
        // usado para preencher os 5 digitos de vereador
        for (let i=0; i<etapa.numeros; i++){ // verifica se a qtd de numeros é igual
            if (i===0){
                numeroHTML+='<div class="numero pisca"></div>'
            }else{
                numeroHTML+= '<div class="numero"></div>';
            }
            
        }
        descricao.innerHTML= '';
        seuVotoPara.style.display='none';
        aviso.style.display='none';
        lateral.innerHTML= '';
        numeros.innerHTML= numeroHTML;
}
// função que irar atualizar a interface de acordo com os numero digitados
 function atualizaInterface(){
    console.log('A interface sera atualizada');
    console.log(GuardaNumero);
    let etapa = etapas[etapaAtual]; // variavel entra no jason
    let FiltraCandidato = etapa.candidatos.filter((item)=>{ // ira realizar uma busca no jason
        if(item.numero === GuardaNumero){ // verifica se o item é identico ao digitado
           return true; 
        }else{
            return false;
        }
    });
    if (FiltraCandidato.length > 0) // entra caso exita o candidato
    {
        FiltraCandidato= FiltraCandidato[0];
        seuVotoPara.style.display='flex';
        descricao.innerHTML=`Nome:${FiltraCandidato.nome}<br/>
                          Partido:${FiltraCandidato.partido}<br/>`
        aviso.style.display='block';
        
        let fotosHTML ='';
        for (let i in FiltraCandidato.fotos){
            if (FiltraCandidato.fotos[i].small){
                    fotosHTML +=`<div class="d-1-image small"> 
                                    <img src="images/${FiltraCandidato.fotos[i].url}" alt="" /> 
                                    ${FiltraCandidato.fotos[i].legenda}
                                </div>`;
            }
            else{ 
                fotosHTML +=`<div class="d-1-image"> 
                                <img src="images/${FiltraCandidato.fotos[i].url}" alt="" /> 
                                ${FiltraCandidato.fotos[i].legenda}
                            </div>`
           }
        }
           
           /*  fotosHTML += FiltraCandidato.fotos[i].legenda; */
      
        lateral.innerHTML=fotosHTML;
    } else{
        seuVotoPara.style.display='flex';
        aviso.style.display='block';
        descricao.innerHTML='<div class="Aviso--grande pisca">VOTO NULO</div>'
    }
    console.log('Candidatos',FiltraCandidato);
    console.log(etapa);
} 
// irar verfiicar onde o pisca irar entrar em acao
function clicou(n){
    let numeroPisca= document.querySelector('.numero.pisca');
   /*  console.log('voce clicou em '+n); */
    if (numeroPisca!== null){
        numeroPisca.innerHTML=n;
        GuardaNumero = `${GuardaNumero}${n}`;
        numeroPisca.classList.remove('pisca'); // remove o pisca
        if(numeroPisca.nextElementSibling!== null){ // ira percorrer os espaços vazios do proximo elemento
            //add o pisca ao proximo elemento
            numeroPisca.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
   /*  console.log(numeroPisca); */
}
function branco(){
    if(GuardaNumero=== ''){
        VerificaBranco = true;
        seuVotoPara.style.display="flex";
        numeros.innerHTML='';
        aviso.style.display='block';
        descricao.innerHTML=`<div class="Aviso--grande pisca">
                                 Voto em Branco
                            </div>`;
    lateral.style.display="none";
    }else{
        alert('Caso deseje votar branco, o voto não deve possuir números');
    }
    
}
function corrige(){
    ComecaEtapas();  
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado= false;
    if (VerificaBranco===true){ // aceita o voto branco
        votoConfirmado= true;
        console.log('Voto em Branco realizado');
        GuardaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'Branco'
        })
    }else if(GuardaNumero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log('Numero do voto: '+GuardaNumero);
        GuardaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: GuardaNumero
        });
    }
   if (votoConfirmado){
        etapaAtual++; //passa para o proximo candidato
        console.log(etapas[etapaAtual]);
        if (etapas[etapaAtual]!== undefined){
            ComecaEtapas();
        }else{
            alert('Voto Finalizado');
            document.querySelector('.tela').innerHTML=`<div class="aviso--gigante pisca">
                                                      FIM </div>`
            console.log(GuardaVotos);
        }
   }
}
ComecaEtapas();