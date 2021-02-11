


const elements = {


    empty: (`
        <div class="d-flex justify-content-center align-items-center">
            <span class="text-secondary pt-1 pb-1">
                <i class="fas fa-box-open fa-2x"></i>
            </span>
        </div>
    `),


    spinner: (`
        <div class="spinner-border spinner-border-sm text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `),


    icon: (name, element = 'i') => {
        
        const names = {

            'search':   () => (`<${ element } class="fas fa-search"></${ element }>`),

            'NF':       () => (`<${ element } class="fas fa-question"></${ element }>`)
        }

        return (names[name] || names['NF'])()
    }

}
