


function today() {
    let init = new Date()

    let date = new Date(
        init.getFullYear(),
        init.getMonth(),
        init.getDay()
    )

    return date
}


function now() {

}



function todayNow() {

}



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
    },


    date: (dateString = '') => {

        return {

            today:      today,
            now:        now,
            todayNow:   todayNow,

            object: () => { return new Date(dateString) },
            string: () => { return (new Date(dateString)).toLocaleDateString() }
        }
    }

}
