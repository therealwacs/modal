function _createModal(options, id) {
    // Options
    const {
        title = 'default title',
        closible = true,
        content = 'default content',
        width = '500px',
        // animation = 'fade'
    } = options


    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.id = id
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window" style="width: ${width}">
                <div class="modal-header">
                    <span class="modal-title">${title}</span>
                    ${closible ? '<span class="modal-close">&times;</span>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn">Ok</button>
                    <button class="btn">Cancel</button>
                    <button class="btn btn-primary" id="set-modal">
                        Подгрузить данные
                    </button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal)
    console.log('Insert modal in body')
    return modal
}


/*
* title: string
* closible: boolean
* content: string
* width: string ('400px')
* destroy(): void - remove node and listeners
* Окно должно закрываться
* ----------------
* setContent(html: string): void | Public
* onOpen(): void  - Hook
* beforeClose(): boolean [true - можно закрыть, false - нет] - Hook
* ----------------
* animate.css - добавить выбор анимации
 */


$.modal = function(options) {
    // Options
    const {
        id = 'modal-id-' + Math.ceil(Math.random() * 999),
        closible = true,
        animation = 'fade'
    } = options


    const ANIMATION_SPEED = 350
    const $modal = _createModal(options, id)
    let closing = false



    return {
        open() {
            if (!closing) {
                $modal.classList.add('open')
            }
            // !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
        destroy() {},
        setContent(html) {
            document.querySelector(`#${id} .modal-body`).innerHTML = html
            void 0
        },
        // onOpen() {} : void,
        // beforeClose() {}
    }
}