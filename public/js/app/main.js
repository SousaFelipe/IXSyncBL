


const inputTypes = [
    'email',
    'text',
    'password',
    'search'
]



const app = {


    clearFormData: (form = 0) => {

        let inputs = document.forms[form].elements

        for (let i = 0; i < inputs.length; i++) {

            const input = inputs[i]

            if (input.type in inputTypes) {
                input.value = ''
            }
        }
    },


    submitForm: (form = 0) => {
        document.forms[form].submit()
    }

}
