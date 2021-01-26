/*
* title: string ✅
* closible: boolean
* content: string ✅
* width: string ('400px') ✅
* destroy(): void - remove node and listeners ✅
* Окно должно закрываться ✅
* ----------------
* setContent(html: string): void | Public ✅
* onOpen(): void  - Hook
* beforeClose(): boolean [true - можно закрыть, false - нет] - Hook
* ----------------
* animate.css - добавить выбор анимации
 */


function _createModal(options, id) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.id = id
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || '500px'}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'default title'}</span>
                    ${options.closible ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || 'default content'}
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
    return modal
}



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
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal destroyed')
            }
            if (!closing) {
                $modal.classList.add('open')
            }
            // !closing && $modal.classList.add('open')
        },
        close() {
            if (destroyed) {
                return console.log('Modal destroyed')
            }
            if (!closible) {
                alert('Закрывать нельзя')
                return false
            }
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    // Close modal listener
    const closeListener = e => {
        if (e.target.dataset.close) {
            modal.close()
        }
    }
    $modal.addEventListener('click', closeListener)


    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', closeListener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        },
        // onOpen() {} : void,
        // beforeClose() {}
    })
}