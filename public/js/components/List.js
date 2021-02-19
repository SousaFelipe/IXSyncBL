


class List {


    static item (content) {
        return (`
            <li class="list-group-item" aria-current="false">
                ${ content }
            </li>
        `)
    }
}
