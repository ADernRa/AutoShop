const cartOverlay = document.querySelector('.cart-overlay');

const cartLink = document.querySelector('.cart-link');
const cartSidebar = document.querySelector('.cart-sidebar');
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

const cart_login = document.querySelector('.cart-login')
const close_btn_login = document.querySelector('.close-btn-login')
const open_btn_login = document.querySelector('.user-link')

function closeLogin(){
    cart_login.classList.remove('open');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = ''; 
}

function openLogin(e){
    e.preventDefault(); 
    cart_login.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = ''; 
}

if (close_btn_login){
    close_btn_login.addEventListener('click', closeLogin);
}

if (open_btn_login){
    open_btn_login.addEventListener('click', openLogin);
}

function closeOverlay() {
    if(cartSidebar.classList.contains('open')){
        closeCart();
    }
    if(cart_login.classList.contains('open')){
        closeLogin()
    }
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeOverlay);
}

const eye_button = document.querySelector('.eye')
eye_button.addEventListener('click', (event) => {
    const passwor_input = document.querySelector('.password')
    const open_eye = document.querySelector('.open-eye')
    const close_eye = document.querySelector('.close-eye')
    
    if(eye_button.classList.contains('close')){
        eye_button.classList.remove('close');
        eye_button.classList.add('open');
        passwor_input.setAttribute('type', 'text');
        close_eye.style.display = 'none';
        open_eye.style.display = 'flex';
    }
    else {
        eye_button.classList.remove('open');
        eye_button.classList.add('close');
        passwor_input.setAttribute('type', 'password');
        close_eye.style.display = 'flex';
        open_eye.style.display = 'none'; 
    }
});