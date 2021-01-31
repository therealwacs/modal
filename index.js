/*
* Динамически вывести список карточек ✅
* Показать цену в поп-апе (1 поп-ап) ✅
* По клику на Удалить показывать другую модалку заголовкомм "Действительно удалить Х ?" с кнопками "Да" "Нет" ✅
* При клике по "Удалить" - удалять карточку из DOM-дерева ✅
* Подсказка: Сделать это написав еще один плагин $.confirm - и он должен работать на Promise-ах ✅
* Доделать то что незакончено с первого задания
 */

let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://w7.pngwing.com/pngs/682/1013/png-transparent-orange-juice-orange-natural-foods-food-orange.png'},
    {id: 3, title: 'Манго', price: 40, img: 'https://pngimg.com/uploads/mango/mango_PNG9168.png'}
]

    // Insert Products into the page
    const toHtml = fruit => `
            <div class="col-3 col-item">
                <div class="card" data-id="${fruit.id}">
                    <div class="thumbnail" style="background-image: url(${fruit.img})"></div>
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title || 'fruit title here'}</h5>
                        <button class="btn btn-sm btn-primary" data-showPrice data-id="${fruit.id}">Посмотреть цену</button>
                        <button class="btn btn-sm btn-danger" data-btn="delete" data-id="${fruit.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `

    function render() {
        const html = fruits.map(toHtml).join('')
        document.querySelector('#products').innerHTML = html
    }
    render()

// Create modal for product showing
    const productModal = $.modal({
        id: 'modal-product',
        closible: true,
        width: '500px',
        animation: 'bounce',
        footerButtons: [
            {text: 'Закрыть', type: 'primary', handler() {
                   productModal.close()
                }},
        ]
    })

document.addEventListener('click', (el) => {
    if(el.target.hasAttribute('data-showPrice')) {
        const productID = +el.target.dataset.id
        const currentFruit = fruits.find(el => el.id === productID)
        if (currentFruit) {
            productModal.setTitle(currentFruit.title)
            productModal.setContent(`Цена ${currentFruit.title} составляет ${currentFruit.price} гривен`)
            productModal.open()
        } else {
            alert('Товар не найден в базе')
        }
    }
})

// Confirm Init
document.addEventListener('click', el => {
    if (el.target.dataset.btn === 'delete') {
        const ID = +el.target.dataset.id
        const currentFruit = fruits.find(f => f.id === +ID)
        console.log(currentFruit)
        const confirm = $.confirm({
            title: `Подтвердите действие`,
            content: `Вы действительно хотите удалить <strong>${currentFruit.title}</strong> ?`,
            element: currentFruit
        }).then(() => {
            fruits = fruits.filter(f => f.id !== ID)
            render()
            console.log('resolve')
        }).catch(() => {
            console.log('Reject')
        })
    }

})