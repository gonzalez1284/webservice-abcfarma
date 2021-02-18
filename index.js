const fetch = require('node-fetch')
require('dotenv').config()

let endPoint = "https://webserviceabcfarma.org.br/webservice/";

const consultaPagina = (cnpj_associado, senha, cnpj_softwarehouse, numpagina) => {
    return fetch(endPoint, {
        "headers": {
          "accept": "*/*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": endPoint,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `cnpj_cpf=${cnpj_associado}&senha=${senha}&cnpj_sh=${cnpj_softwarehouse}&pagina=${numpagina}`,
        "method": "POST",
        "mode": "cors"
    })       
}

const salvaPagina = async(json) => {

    /* 
     *
     * Salvar os dados em um local de escolha
     * Ex: Mongodb, SQL, Arquivo..
     * 
     */
    console.log(json.data[0])
}

const consome = async() => {

    const cnpj_associado = process.env.CNPJ_ASSOCIADO
    const senha = process.env.SENHA_ASSOCIADO
    const cnpj_softwarehouse = process.env.CNPJ_SOFTWAREHOUSE

    let numpagina = 2
    let total_paginas = 0

    do {

        const res = await consultaPagina(cnpj_associado, senha, cnpj_softwarehouse, numpagina)
        const json = await res.json()

        if(json.total_paginas){

            total_paginas = json.total_paginas
            console.log('Consultando página: '+ numpagina + ' de '+ total_paginas)
            salvaPagina(json)
            numpagina++

        } else {
            // TRATAR O ERRO APRESENTADO
            console.log(json)
            break
        }
        
        

    } while(numpagina <= total_paginas)
    
}

consome()