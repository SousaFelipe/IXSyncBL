


$("#search").on("input", function() {

    var input = $(this)
    var value = input.val()

    if (value.toString().length >= 3) {

        let url = utils.url('clientes/listar/vbusca/tbusca', {
            vbusca: value,
            tbusca: (utils.isNumber(value)) ? `cnpj_cpf` : `razao`
        })

        $.ajax({

            url : url,
            type : 'GET',

            beforeSend: () => {
                $("#searchResult").html("ENVIANDO...")
            }
       })
       .done(response => {
            console.log(response)
            $("#searchResult").html("")
       })
       .fail((jqXHR, textStatus, msg) => {
            console.log(jqXHR)
            console.log(textStatus)
            console.log(msg)
       })
    }
})

