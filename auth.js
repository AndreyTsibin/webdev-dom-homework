const addForm = document.querySelector('.add-form');
const loginName = document.querySelector('.login-form-name');
const loginPassword = document.querySelector('.login-form-pass');
const loginButton = document.querySelector('.login-form-button');

export { addForm, loginName, loginPassword, loginButton };

//Скрыть форму добавления комментария
addForm.classList.add('hidden');

//Функция проверяет заполнены поля или нет
loginButton.addEventListener('click', () => {
  checkInputs();
});

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
};