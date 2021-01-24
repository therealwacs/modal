const options = {
        id: 'contact-modal',
        title: 'Форма обратной связи',
        closible: true,
        content: 'Контент модального окна',
        width: '500px',
        animation: 'bounce'
}
const modal = $.modal(options)



let modalTrigger = document.querySelector('#open-modal')
modalTrigger.addEventListener('click', () => {
        modal.open()
})


let setContentTrigger = document.querySelector('#set-modal')
setContentTrigger.addEventListener('click', () => {
        modal.setContent('<p>Получены новые данные с срвера!!</p>')
})
