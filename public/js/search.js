


function searchForClients(e) {
    e.preventDEfault()

    let value = e.target.value

    console.log(value)

    if (value.toString().lenght >= 3) {

        let url = utils.url('clientes/listar/vbusca/tbusca', {
            vbusca: value,
            tbusca: (utils.isNumber(value)) ? `cnpj_cpf` : `razao`
        })

        console.log(url)

        $.ajax({

            url : url,
            type : 'GET',

            beforeSend : function(){
                 $("#resultado").html("ENVIANDO...")
            }
       })
       .done(response => {
            console.log(response)
       })
       .fail((jqXHR, textStatus, msg) => {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(msg)
       })
    }
}
