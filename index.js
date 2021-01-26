


//
const modal = $.modal({
    id: 'contact-modal',
    title: 'Форма обратной связи',
    closible: true,
    content: 'Контент модального окна',
    width: '500px',
    animation: 'bounce'
})

// Methode .open()
let modalTrigger = document.querySelector('#open-modal')
modalTrigger.addEventListener('click', modal.open)

// Method setContent()
let setContentTrigger = document.querySelector('#set-modal')
setContentTrigger.addEventListener('click', () => {
    modal.setContent('<p>Получены новые данные с срвера!!</p>')
})