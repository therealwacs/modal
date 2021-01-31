$.confirm = function (options) {
    // alert('Confirm works')
    // options.action()

    return new Promise((resolve, reject) => {
        const currentProduct = options.element
        const confirmModal = $.modal({
            title: options.title,
            content: options.content,
            closible: false,
            onClose() {
              confirmModal.destroy()
            },
            footerButtons: [
                {text: 'Отмена', type: 'primary', handler() {
                        reject()
                        confirmModal.close()
                    }},
                {text: 'Удалить', type: 'danger', handler() {
                        resolve()
                        confirmModal.close()
                    }},
            ]
        })

        setTimeout(() => confirmModal.open(), 100)
        return confirmModal
    })
}