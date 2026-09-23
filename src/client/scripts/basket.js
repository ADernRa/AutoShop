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
    }
});

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