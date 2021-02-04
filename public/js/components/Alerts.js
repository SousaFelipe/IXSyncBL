


function getPriority(contentPriority) {

    const prioridades = {
        'A': () => { return { layout: 'danger', title: `Crítico!` } },
        'B': () => { return { layout: 'warning', title: `Importante!` } }
    }

    return (prioridades[contentPriority] || prioridades['B'])()
}



const Alert = function(container, type = 'div') {

    return {
        display: (content) => {

            $(`${ type }[id="${ container }"]`).html(`
                <div class="alert alert-${ getPriority(content.prioridade).layout } mb-2 pb-0" role="alert">
                    <h4 class="alert-heading">${  getPriority(content.prioridade).title }</h4>
                    <p> ${ content.mensagem } </p>
                </div>
            `)
            // Cliente ficou 15 dias sem acesso. Foi concedido ao mesmo o valor de R$30,00 de desconto na fatuda do mês de Fevereiro.
        }
    }
}
