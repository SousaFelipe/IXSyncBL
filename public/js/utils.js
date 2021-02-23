


function today() {
    let init = new Date()

    let date = new Date(
        init.getFullYear(),
        init.getMonth(),
        init.getDay()
    )

    return date
}



const utils = {


    url: (url, data) => {

        let formattedUrl = `${ APP_URL }/${ url }`

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                formattedUrl = formattedUrl.replace(`{${ key }}`, data[key])
            }
        }

        return formattedUrl
    },


    isNumber: (obj) => {
        return !isNaN(parseFloat(obj)) && isFinite(obj)
    },


    date: (dateString = '') => {

        return {

            today:      today,

            isValid:    () => (dateString != 'Invalid Date'),

            object: () => { return new Date(dateString) },
            string: () => { return (new Date(dateString)).toLocaleDateString() }
        }
    },


    calc: () => {

        return {

            accumulate: (arr, key) => {
                let total = 0

                if (arr && arr.length > 0) {
                    arr.forEach(obj => {
                        if (Object.hasOwnProperty.call(obj, key)) {
                            total = total + parseFloat(obj[key])
                        }
                    })
                }

                return total
            },

            ptBRL: val  => {
                let floatVal = parseFloat(val)
                return floatVal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            },

        }
    },


    font: () => {

        return {

            shouldBeBolder (valor) {
                return parseFloat(valor) > 0.00 ? `fw-bolder` : `fw-normal`
            }
        }
    }

}
