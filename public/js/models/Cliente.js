


class Cliente {


    constructor(model) {
        this.model = model
    }


    cpf() {
        return (this.model.cnpj_cpf != '') ? this.model.cnpj_cpf : 'NENHUM CPF'
    }


    rg() {
        return (this.model.ie_identidade != '') ? this.model.ie_identidade : 'NENHUM RG'
    }


    contato() {
        return (
            (this.model.whatsapp != '')
                ? this.model.whatsapp
                : (this.model.telefone_celular != '')
                    ? this.model.telefone_celular
                    : (this.model.fone != '')
                        ? this.model.fone
                        : 'NENHUM CONTATO'
        )
    }


    enderecoCompleto() {
        return `${ this.model.endereco }, ${ (this.model.numero || `SN`) }, ${ this.model.complemento }`
    }
}
