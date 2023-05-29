import { userName } from './main.js';

const userHost = 'https://wedev-api.sky.pro/api/user/login';

const addForm = document.querySelector('.add-form');
const loginBlock = document.querySelector('.login-block');
const loginName = document.querySelector('.login-form-name');
const loginPassword = document.querySelector('.login-form-pass');

const loginButton = document.querySelector('.login-form-button');

let newToken = '';
let token = `Bearer ${newToken}`;

export { token };

export { addForm, loginName, loginPassword, loginButton, loginBlock };

// Скрыть форму добавления комментария
addForm.classList.add('hidden');

// Функция проверяет заполнены поля или нет
loginButton.addEventListener('click', () => {
  checkInputs();
  loginValidation(loginName.value, loginPassword.value)
    .then((success) => {
      if (success) {
        loginBlock.style.display = 'none';
        addForm.style.display = 'block';
      } else {
        loginBlock.style.display = 'block';
        addForm.style.display = 'none';
        checkInputs();
      }
    })
    .catch((error) => {
      console.log('Ошибка авторизации:', error);
    });
});

// Проверяем, что поля не пустые
function checkInputs() {
  const loginNameValue = loginName.value.trim();
  const loginPasswordValue = loginPassword.value.trim();
  if (loginNameValue === '') {
    loginName.placeholder = 'Напишите логин';
    loginName.classList.add('error');
  }
  if (loginPasswordValue === '') {
    loginPassword.placeholder = 'Напишите пароль';
    loginPassword.classList.add('error');
  }
}

// Делаем запрос для проверки авторизации
export function loginValidation(login, password) {
  return fetch(userHost, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        alert('Логин или пароль введены неверно или поля не заполнены');
        throw new Error('Неправильный логин или пароль');
      } else {
        throw new Error('Ошибка авторизации');
      }
    })
    .then((user) => {
      newToken = user.user.token;
      token = `Bearer ${newToken}`;
      userName.value = user.user.login;
      userName.disabled = true;
      return true; // Авторизация
    })
    .catch((error) => {
      console.log(error.message);
      return false; // Ошибка авторизации
    });
}