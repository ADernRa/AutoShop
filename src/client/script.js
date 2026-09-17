function get_product(){
    var category = document.querySelector('.active-category').dataset.category
    var min_cost = document.getElementById('min-cost').value
    var max_cost = document.getElementById('max-cost').value
    var promotions = document.getElementById('promotions').checked

    const ProductSearch = {
        min_price: min_cost,
        max_price: max_cost,
        category: category,
        promotion: promotions
    }

    fetch('http://127.0.0.1:8000/api/search/products',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ProductSearch)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Помилка серверу")
        }
        return response.json()
    })
    .then(data => {
        const container = document.querySelector('.items');
        container.innerHTML = '';
        const count = data.length

        for(let i=0; i<count; i++){
            const cardHTML = `
            <div class="card-item" data-id="${data[i].id}">
                <img src="${data[i].image}" alt="Товар" class="card-image">
                <h3 class="card-title">${data[i].title}</h3>
                <div class="card-price">${data[i].price} ₽</div>
                <button class="card-button">В корзину</button>
            </div>
        `;

            container.innerHTML += cardHTML;
        }
    })
}

const buttons = document.querySelectorAll('.category-btn');
buttons.forEach((button) => {
        button.addEventListener('click', (event) => {

        var active_button = document.querySelector('.active-category')
        if(active_button){
            active_button.classList.remove('active-category'); 
        }

        event.target.classList.add('active-category');

        get_product()
    });
    
});

const checkbox = document.getElementById('promotions')
checkbox.addEventListener('change', () =>
    get_product()
)


const min_cost = document.getElementById('min-cost')
const max_cost = document.getElementById('max-cost')

min_cost.addEventListener('change', () =>
    get_product()
)

max_cost.addEventListener('change', () =>
    get_product()
)