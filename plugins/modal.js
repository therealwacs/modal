function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Modal title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit.</p>
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
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
    const ANIMATION_SPEED = 350
    const $modal = _createModal(options)
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
        destroy() {}
    }
}