


const sidenav = {

    toggle: () => {

        const element = document.getElementById('sidenav')

        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
        else {
            element.classList.add('active')
        }
    }
}
