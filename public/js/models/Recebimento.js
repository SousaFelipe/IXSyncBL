


class Recebimento {



    constructor(props) {

        this.id = props.id
        this.id_cliente = props.id_cliente

        this.data = {
            emissao:        props.data_emissao,
            pagamento:      props.pagamento_data,
            cancelamento:   props.data_cancelamento,
            vencinmento:    props.data_vencimento
        }

        this.data_cancelamento = utils.date(props.data_cancelamento).string()
        this.data_emissao = utils.date(props.data_emissao).string()
        this.data_vencimento = utils.date(props.data_vencimento).string()

        this.documento = props.documento
        this.id_conta = props.id_conta
        this.id_contrato = props.id_contrato
        this.numero_parcela_recorrente = props.numero_parcela_recorrente
        this.obs = props.obs
        this.pagamento_data = props.pagamento_data
        this.pagamento_valor = props.pagamento_valor

        this.status = props.status
        this.status_cor = this.getStatusCor()
        this.status_icone = this.getStatusIcone()

        this.valor = props.valor
        this.valor_aberto = props.valor_aberto
        this.valor_cancelado = props.valor_cancelado
        this.valor_recebido = props.valor_recebido
    }



    vencimento() {

        let hoje = new Date()
        let vencimento = new Date(this.data.vencinmento)

        return {
            hoje: () => (hoje == vencimento),
            passou: () =>  (hoje > vencimento)
        }
    }



    dataBaixa() {

        let badge = `<span class="badge rounded-pill bg-secondary">Não</span>`

        let baixa = utils.date(

            (this.data.pagamento != '')
                ? this.data.pagamento
                : (this.data.cancelamento != '')
                    ? this.data.cancelamento
                    : null

        ).string()

        return utils.date(baixa).isValid() ? baixa : badge
    }



    getStatusCor() {

        const cores = {
            'A': () => (this.vencimento().hoje()) ? 'warning' : this.vencimento().passou() ? `danger` : `info`,
            'R': () => `success`,
            'P': () => `primary`,
            'C': () => `secondary`,
            'U': () => `light`
        }

        return (cores[this.status] || cores['U'])()
    }



    getStatusIcone() {

        const icones = {
            'A': () => this.vencimento().hoje() ? 'exclamation' : this.vencimento().passou() ? 'exclamation-triangle' : 'thumbs-up',
            'R': () => `money-bill-wave`,
            'P': () => `coins`,
            'C': () => `thumbs-down`,
            'U': () => `question-circle`
        }

        return (icones[this.status] || icones['U'])()
    }
}
