var card_buttons = document.querySelectorAll('.card-button');;

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
                <div class="card-price">${data[i].price} грн.</div>
                <button class="card-button">До кошику</button>
            </div>
        `;
            
            container.innerHTML += cardHTML;
            card_buttons = document.querySelectorAll('.card-button');
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    get_product(); 
});

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

const itemsContainer = document.querySelector('.items'); 
const cart_content = document.querySelector('.cart-content');

itemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-button')) {
        if(cart_content.textContent.includes('Ваш кошик порожній.')){
            cart_content.innerHTML = '';
        }
        
        const card = event.target.closest('.card-item');

        const productData = {
            id: card.dataset.id,                                       
            img: card.querySelector('.card-image').getAttribute('src'), 
            title: card.querySelector('.card-title').textContent.trim(),   
            price: card.querySelector('.card-price').textContent.trim()   
        };

        const cardHTML = `
            <div class="cart-product" data-id="${productData.id}">
                    <div>
                        <img src="${productData.img}" alt="Товар">
                    </div>
                    <div class="product_info">
                        <h3>${productData.title}</h3>
                        <div class="product_price">${productData.price}</div>
                        <button class="back-button">Видалити</button>
                    </div>
                </div>
        `;
        
        cart_content.innerHTML += cardHTML
    }});

const checkbox = document.getElementById('promotions')
checkbox.addEventListener('change', () =>
    get_product()
)

cart_content.addEventListener('click', (event) => {
    if (event.target.classList.contains('back-button')) {
        const cartProduct = event.target.closest('.cart-product');
        if (cartProduct) {
            cartProduct.remove(); 
        }
        
        if (cart_content.children.length === 0) {
            cart_content.innerHTML = '<p>Ваш кошик порожній.</p>';
        }
    }
});

const min_cost = document.getElementById('min-cost')
const max_cost = document.getElementById('max-cost')

min_cost.addEventListener('change', () =>
    get_product()
)

max_cost.addEventListener('change', () =>
    get_product()
)

const cartLink = document.querySelector('.cart-link');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeBtn = document.querySelector('.close-btn');

function openCart(e) {
    e.preventDefault(); 
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = ''; 
}

if (cartLink) {
    cartLink.addEventListener('click', openCart);
}
    
if (closeBtn) {
    closeBtn.addEventListener('click', closeCart);
}

if (cartOverlay) {
     cartOverlay.addEventListener('click', closeCart);
}