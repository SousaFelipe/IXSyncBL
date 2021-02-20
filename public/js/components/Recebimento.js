


class Recebimento {


    static status(financeiro) {

        if (financeiro.vencidos.length > 0) {
            return 'danger'
        }

        if (financeiro.em_aberto.length > 0) {
            return 'warning'
        }

        return 'primary'
    }


    static descricao(financeiro) {

        let vencidos = financeiro.vencidos
        let emAberto = financeiro.em_aberto

        if (vencidos.length > 0) {
            return (`
                ${ (vencidos.length <= 0) ? 'NENHUMA ' : (vencidos.length > 9) ? `${ vencidos.length } ` : `0${ vencidos.length } ` }
                MENSALIDADE${ (vencidos.length > 1) ? 'S' :  '' } ATRASADA${ (vencidos.length > 1) ? `S` : `` }
            `)
        }

        if (emAberto.length > 0) {
            return (`01 MENSALIDADE EM ABERTO`)
        }

        return `NENHUMA PENDÊNCIA`
    }
}
