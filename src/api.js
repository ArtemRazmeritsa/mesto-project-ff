import { checkResponse } from "./utils.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "10b7c520-7611-4736-ac14-58b5cfbecdab",
    "Content-Type": "application/json",
  },
};

function request(endpoint, options = {}) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    method: options.method,
    headers: config.headers,
    body: options.body,
  }).then(checkResponse);
}

// ЗАПРОС ДАННЫХ ПОЛЬЗОВАТЕЛЯ
export function getUserInfo() {
  return request("/users/me");
}

// СОХРАНЯЕМ НОВЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
export function saveNewUserData(profileTitle, profileDescription) {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: profileTitle,
      about: profileDescription,
    }),
  });
}

// ЗАПРОС КАРТОЧЕК
export function getInitialCards() {
  return request("/cards");
}

// ОТПРАВЛЯЕМ ЗАПРОС НА ДОБАВЛЕНИЕ КАРТОЧКИ
export function addNewCard({ name, link }) {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

// ОТПРАВЛЯЕМ ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ
export function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
}

// СТАВИМ ЛАЙК
export function addLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({}),
  });
}

// УДАЛЯЕМ ЛАЙК
export function deleteLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
}

// СМЕНА АВАРАТА
export function updateAvatar(avatarUrl) {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
}
