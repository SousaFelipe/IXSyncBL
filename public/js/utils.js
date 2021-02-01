


const utils = {


    url: (url, data) => {

        let formattedUrl = `${ APP_URL }/${ url }`

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                formattedUrl = formattedUrl.replace(key, data[key])
            }
        }

        return formattedUrl
    },


    isNumber: (obj) => {
        return !isNaN(parseFloat(obj)) && isFinite(obj)
    }
}
