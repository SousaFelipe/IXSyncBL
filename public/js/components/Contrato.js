


class Contrato {


    static cor(status) {

        const cores = {
            'A' : () => 'success',
            'CM': () => 'danger',
            'CA': () => 'danger',
            'FA': () => 'warning',
            'AA': () => 'info',
            'L' : () => 'light'
         }

        return (cores[status] || cores['L'])()
    }


    static internet(status) {

        const internetes = {
            'A' : () => 'ATIVO',
            'CM': () => 'BLOQUEADO',
            'CA': () => 'BLOQUEADO',
            'FA': () => 'EM ATRASO',
            'AA': () => 'ASSINATURA'
        }

        return (internetes[status] || internetes['A'])()
    }


    static status(contratos) {

        const contrato = (Array.isArray(contratos) && contratos.length > 0) ? contratos[0] : contratos

        if (contrato && contrato.status == 'A') {
            return {
                cor: this.cor(contrato.status_internet),
                internet: this.internet(contrato.status_internet),
                disabled: ''
            }
        }

        return {
            cor: 'secondary',
            internet: 'DESATIVADO',
            disabled: 'disabled'
        }
    }


    static descricao(contratos, text = 'CONTRATO', full = false) {
        return (`
            ${ (contratos.length <= 0) ? 'NENHUM ' : (contratos.length > 9) ? `${ contratos.length } ` : `0${ contratos.length } ` }
            ${ text }${ (contratos.length > 1) ? 'S' :  '' }
            ${ full ? `${ Contrato.status(contratos).internet }${ (contratos.length > 1) ? 'S' :  '' }` : `` }
        `)
    }
}
