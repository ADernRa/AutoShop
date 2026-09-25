const enter_login_but = document.querySelector('.login-but')

function EnterAcc(){
    const login = document.querySelector('.login')
    const password = document.querySelector('.password')
    const log = document.querySelector('.log-com');
    const com = document.querySelector('.pas-com');

    log.style.borderBottom = 'none';
    com.style.borderBottom = 'none';

    const UserBase = {
        login: login.value,
        password: password.value
    }

    fetch('http://127.0.0.1:8000/api/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UserBase)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                return Promise.reject(data);
            }
            return data;
        });
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
        alert(data.user.role)
    })
    .catch(error => {
        if (error.detail?.field === 'login') {
            log.style.borderBottom = '4px solid red';
            com.style.borderBottom = '4px solid red';
        }
        else {
            alert('Помилка сервера або з\'єднання');
        }
    })
}

const register_login_but = document.querySelector('.register-but-next')

function RegisterAcc(){
    const login = document.querySelector('.new-login')
    const password = document.querySelector('.new-password')
    const confirm_password = document.querySelector('.new-password-confirm')

    const password_conteiner = document.querySelector('.password-conteiner');
    const log = document.querySelector('.reg-log label');
    const log_con = document.querySelector('.reg-con');

    password_conteiner.style.borderBottom = '';
    log_con.style.borderBottom = '';
    log.textContent = 'Логін';

    if (password.value!=confirm_password.value || !password.value.trim()){
        password_conteiner.style.borderBottom = '4px solid red';
    } 
    else {
        const UserCreate = {
            login: login.value,
            password: password.value
        }

        fetch('http://127.0.0.1:8000/api/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UserCreate)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    return Promise.reject(data);
                }
                return data;
            });
        })
        .then(data => {
            alert(data.role)
        })
        .catch(error => {
            if (error.detail?.field === 'login') {
                log.textContent = 'Логін зайнятий';
                log_con.style.borderBottom = '4px solid red';
            }
            else {
                alert('Помилка сервера або з\'єднання');
            }
        })
    }
}

if (register_login_but){
    register_login_but.addEventListener('click', RegisterAcc);
} 

if (enter_login_but){
    enter_login_but.addEventListener('click', EnterAcc);
} 