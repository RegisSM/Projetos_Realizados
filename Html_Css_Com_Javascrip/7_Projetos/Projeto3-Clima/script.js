//Projeto possui manipução de api com uma requisição externa e também há utlização de função sincrona
  

    /* 
    A tag <sup> define um caractere acima da linha normal e às vezes é renderizado em uma fonte menor
    Comandos importantes em js:
    • event.preventDefault() => previne que o form seja enviado;
    • Uso de api
    • Codigo async => código que não é ordenado
    • encodeURI() => transforma os espaço de uma frase em código legível ser codificado
    • setAttribute => troca o valor do atributo setado
  */

    document.querySelector('.busca').addEventListener('submit',async(event)=>{
            event.preventDefault();//previne que o furm seja enviado
        let input =document.querySelector('#searchInput').value;
            if (input!==''){
                    clearInfo(); // limpa a tela para iniciar uma nova pesquisa
                    showWarning('Carregando...');/* 166e80da1b86c60d193b2780493f8dfc */
                let url =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=166e80da1b86c60d193b2780493f8dfc&units=metric&lang=pt_br`;
                let results = await fetch(url); // pega os dado da url
                let TransfNoJson = await results.json(); // transforma em objeto
                    console.log(TransfNoJson);
                    if(TransfNoJson.cod===200){ // 200 é quando acha uma localizacao
                        showInfo({
                            name: TransfNoJson.name, //nome
                            country: TransfNoJson.sys.country, //cidade
                            temp: TransfNoJson.main.temp, //temperatura
                            tempIcon: TransfNoJson.weather[0].icon, //icone
                            description: TransfNoJson.weather[0].description, // descrição da temperatura
                            windSpeed: TransfNoJson.wind.speed,//velocidade do vento 
                            windAngle: TransfNoJson.wind.deg // ângulo do vento
                        });
                    }else{
                        clearInfo();// usada para limpar pesquisas que não foram encontradas
                        showWarning('Esta localização não foi encontrada.');
                    }
            }else{ 
                clearInfo();
                showWarning('Porfavor, digite uma localização valida!');
                        
            }
    });
    //funções usadas no projeto:
    function showInfo(ObjetosDoJson){ // recebera o paramentro do json
        showWarning(''); // limpa a tela, ou seja tira o carregando
        
        document.querySelector('.titulo').innerHTML=`${ObjetosDoJson.name}, ${ObjetosDoJson.country}`;//exibe o nome e a cidade
        document.querySelector('.tempInfo').innerHTML=`${ObjetosDoJson.temp}<sup> ºC</sup>`;
        document.querySelector('.ventoInfo').innerHTML= `${ObjetosDoJson.windSpeed}<span>km/h</span>`;
        document.querySelector('.temperatura img').setAttribute('src',`http://openweathermap.org/img/wn/${ObjetosDoJson.tempIcon}@2x.png`); //troca o valor do atributo setado
        document.querySelector('.VentoPonto').style.transform=`rotate(${ObjetosDoJson.windAngle-90}deg)`;
        document.querySelector('.resultado').style.display='block'; //mostra os resutados na tela
    }
    function showWarning(msg){
        document.querySelector('.aviso').innerHTML = msg;
        //abaixo sera inserido a url de uma api
        
    }
    function clearInfo(){ 
        showWarning('');
        document.querySelector('.resultado').style.display='none';
    }