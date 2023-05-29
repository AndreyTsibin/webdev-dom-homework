import { loading } from './main.js';
import { renderComments } from './rendering.js';
import { token } from './auth.js';

let appComments = [];
export { appComments }

const host = 'https://wedev-api.sky.pro/api/v2/andrey-zibin/comments';


export { host };

//Получение данных
export function getCommentsFromAPI() {
  return fetch(host, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  })
    .then((response) => response.json())
    .then((responseData) => {
      appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          dates: new Date(comment.date),
          text: comment.text,
          like: comment.likes,
          Iliked: false,
        };
      });
      loading.style.display = 'none'
      renderComments();
    });
}

getCommentsFromAPI()

// Отправка комментария
export function sendCommentToServer(comment, addForm, loading, userName, textComment, button, appComments) {

  if (addForm) {
    addForm.style.display = 'none';
    loading.style.display = 'block';
  }

  const userNameValue = userName.value;
  const textCommentValue = textComment.value;

  return fetch(host, {
    method: 'POST',
    body: JSON.stringify(comment),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Server Error');
        }
        throw new Error('Ошибка сервера: ' + response.status);
      }
      return response.json();
    })

    .then((responseData) => {
      if (addForm) {
        addForm.style.display = 'block';
        loading.style.display = 'none';
      }

      console.log('Комментарий успешно отправлен на сервер:', responseData);
      appComments.push(responseData);

      getCommentsFromAPI();
      renderComments();

      textComment.value = '';
      userName.value = '';
      button.setAttribute('disabled', '');
    })
    .catch((error) => {
      console.error('Ошибка при отправке комментария на сервер:', error);
      if (comment.name.length < 3 || comment.text.length < 3) {
        alert('Введите не менее 3 символов');
      } else if (error.message === 'Server Error') {
        alert('Сервер сломался, попробуйте позже');
      } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      }
      userName.value = userNameValue;
      textComment.value = textCommentValue;
      addForm.style.display = 'block';
      loading.style.display = 'none';
    });
}




