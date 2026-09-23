const enter_login_but = document.querySelector('.login-but')

function EnterAcc(){
    const login = document.querySelector('.login')
    const password = document.querySelector('.password')

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
        if(!response.ok){
            throw new Error("Помилка серверу")
        }
        return response.json()
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
        alert(data.user.role)
    })
    .catch(error => {
        alert("Невірний логін або пароль!");
    })
}

if (enter_login_but){
    enter_login_but.addEventListener('click', EnterAcc);
} 