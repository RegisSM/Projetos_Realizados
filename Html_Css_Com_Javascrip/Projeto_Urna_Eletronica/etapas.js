let etapas=[
    {
        titulo:'VEREADOR',
        numeros: 5, // são 5 digitidos para vereador
        candidatos:[
            { //Primeiro Candidato
                numero: '11111',
                nome:'Fulano de Tal',
                partido:'ABC',
                fotos:[
                    {
                        url:'38111.jpg',
                        legenda:'Vereador',
                         small: false 
                    }]
            },
            { //Segundo Candidato
                numero:'77222',
                nome:'Beltrano da Silva',
                partido:'DEFG',
                fotos:[{url:'77222.jpg',legenda:'Vereador'}]
            }
        ]
    },
    {
        titulo:'PREFEITO',
        numeros:2,
        candidatos:[
            {
                numero:'99',
                nome:'Ciclano',
                partido:'ABC',
                vice:'Cic',
                fotos:[
                    {url:'99.jpg',legenda:'Prefeito'},
                    {url:'99_2.jpg',legenda:'Vice-Prefeito',small:false},
                ]
            },
            {
                numero:'84',
                nome:'Zulano',
                partido:'QMWERTY',
                vice:'Zul',
                fotos:[
                    {url:'84.jpg',legenda:'Prefeito'},
                    {url:'84_2.jpg',legenda:'Vice-Prefeito',small: false}
                ]
            }
        ]
    }
]