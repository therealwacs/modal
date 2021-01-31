/*
* title: string ✅
* closible: boolean
* content: string ✅
* width: string ('400px') ✅
* destroy(): void - remove node and listeners ✅
* Окно должно закрываться ✅
* ----------------
* setContent(html: string): void | Public ✅
* onClose(html: string): void | Public ✅
* onOpen(): void  - Hook
* beforeClose(): boolean [true - можно закрыть, false - нет] - Hook
* ----------------
* animate.css - добавить выбор анимации
 */

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

const noop = () => {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options, id) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.id = id

    if (options.buttons) {
        const buttons = options.buttons.map(button => {
            const btn = document.createElement('button', )
            console.log(btn)
        })
    }

    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || '500px'}">
                <div class="modal-header">
                    <span class="modal-title" data-title>${options.title || 'default title'}</span>
                    ${options.closible ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || 'default content'}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
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
            !closing && $modal.classList.add('open')
        },
        close() {
            if (destroyed) {
                return console.log('Modal destroyed')
            }
            // if (!closible) {
            //     alert('Закрывать нельзя')
            //     return false
            // }
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
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
        setTitle(html) {
            $modal.querySelector('[data-title]').innerHTML = html
        },
        // onOpen() {} : void,
        // beforeClose() {}
    })
}