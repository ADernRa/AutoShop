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

const cart_login = document.querySelector('.cart-login');
const close_btn_login = document.querySelector('.close-btn-login');
const open_btn_login = document.querySelector('.user-link');

const close_btn_register = document.querySelector('.close-btn-register');
const open_btn_register = document.querySelector('.register-but');
const reg_win = document.querySelector('.register-window');
const log_win = document.querySelector('.login-window');

function Change(){
    const log = document.querySelector('.log-com')
    const com = document.querySelector('.pas-com')
    log.style.borderBottom = 'none';
    com.style.borderBottom = 'none'; 
}

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
    Change();
}

function openRegister(){
    reg_win.style.display = 'block';
    log_win.style.display = 'none'
}

function closeRegister(){
    reg_win.style.display = 'none';
    log_win.style.display = 'block'
    const password_conteiner = document.querySelector('.password-conteiner')
    const confirm_password_conteiner = document.querySelector('.password-conteiner_conf')
    password_conteiner.style.borderBottom = 'none';
    confirm_password_conteiner.style.borderBottom = 'none';

    Change();

    const log = document.querySelector('.reg-log label')
    const log_con = document.querySelector('.reg-con')
    log.textContent = 'Логін';
    log_con.style.borderBottom = 'none';
}

const eye_button = document.querySelector('.eye')
function ButEye(){
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
};

if (close_btn_login){
    close_btn_login.addEventListener('click', closeLogin);
}

if (open_btn_login){
    open_btn_login.addEventListener('click', openLogin);
}

if (open_btn_register){
    open_btn_register.addEventListener('click', openRegister);
}

if (close_btn_register){
    close_btn_register.addEventListener('click', closeRegister);
}

if (eye_button){
    eye_button.addEventListener('click', ButEye);
}

function closeOverlay() {
    if(cartSidebar.classList.contains('open')){
        closeCart();
    }
    if(cart_login.classList.contains('open')){
        closeLogin()
        closeRegister()
    }
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeOverlay);
}


