import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, validationConfig } from "./components/validation.js";
import { handleSubmit, renderLoading } from "./utils.js";
import {
  getUserInfo,
  getInitialCards,
  saveNewUserData,
  addNewCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar,
} from "./api.js";
import {
  btnOpenEditProfile,
  popupEditProfile,
  btnAddNewCard,
  popupAddNewCard,
  popupImage,
  formProfileEdit,
  formCreateNewCard,
  cardsContainer,
  profileTitle,
  profileDescription,
  nameProfileInput,
  aboutProfileInput,
  buttonSubmitProfile,
  titleCardInput,
  linkCardInput,
  popupImageElement,
  popupCaption,
  popups,
  profileImage,
  popupConfirmDelete,
  buttonConfirmDelete,
  popupNewAvatar,
  formCreateNewAvatar,
  urlAvatar,
} from "./components/constants.js";

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ И УСТАНОВКИ ЗНАЧЕНИЙ ПОЛЕЙ ВВОДА
function openEditProfilePopup() {
  nameProfileInput.value = profileTitle.textContent;
  aboutProfileInput.value = profileDescription.textContent;
  buttonSubmitProfile.classList.add(validationConfig.inactiveButtonClass);
  openPopup(popupEditProfile);
}

// РЕДАКТИРОВАТЬ ПРОФИЛЬ
function handleProfileEditForm(evt) {
  function makeRequest() {
    return saveNewUserData(
      nameProfileInput.value,
      aboutProfileInput.value,
    ).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupEditProfile);
    });
  }
  handleSubmit(makeRequest, evt);
}

// СМЕНИТЬ АВАТАР
function handleUpdateNewAvatar(evt) {
  function makeRequest() {
    return updateAvatar(urlAvatar.value).then(() => {
      profileImage.style.backgroundImage = `url(${urlAvatar.value})`;
      closePopup(popupNewAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
btnOpenEditProfile.addEventListener("click", openEditProfilePopup);

// ОТКРЫТЬ ПОПАП ИЗМЕНЕНИЯ АВАТАРА
profileImage.addEventListener("click", () => openPopup(popupNewAvatar));

// СОХРАНИТЬ И ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
formProfileEdit.addEventListener("submit", handleProfileEditForm);

// СОХРАНИТЬ И ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
formCreateNewAvatar.addEventListener("submit", handleUpdateNewAvatar);

// ДОБАВИТЬ КАРТОЧКУ

function handleCreateNewCard(evt) {
  function makeRequest() {
    const titleInputValue = titleCardInput.value;
    const linkInputValue = linkCardInput.value;
    const newCardData = {
      name: titleInputValue,
      link: linkInputValue,
    };

    return addNewCard(newCardData).then((cardDataFromServer) => {
      const newCard = createCard(
        {
          name: cardDataFromServer.name,
          link: cardDataFromServer.link,
          likes: cardDataFromServer.likes,
          ownerId: cardDataFromServer.owner._id,
          cardId: cardDataFromServer._id,
        },
        likeHandler,
        openImgPopup,
        currentUserId,
        openPopupConfirmDelete,
      );

      cardsContainer.prepend(newCard);
      closePopup(popupAddNewCard);
    });
  }
  handleSubmit(makeRequest, evt);
}

// ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
btnAddNewCard.addEventListener("click", () => openPopup(popupAddNewCard));

// ДОБАВИТЬ КАРТОЧКУ И ЗАКРЫТЬ ПОПАП КАРТОЧКИ
formCreateNewCard.addEventListener("submit", handleCreateNewCard);

// ОТКРЫТЬ ПОПАП КАРТИНКИ
function openImgPopup(name, link) {
  popupImageElement.alt = name;
  popupImageElement.src = link;
  popupCaption.textContent = name;

  openPopup(popupImage);
}

// ОТКРЫТЬ ПОПАП УДАЛЕНИЯ КАРТОЧКИ
let cardToDelete;
let cardIdToDelete;

function openPopupConfirmDelete(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openPopup(popupConfirmDelete);
}

// УДАЛИТЬ КАРТОЧКУ
export function handleDeleteCard(evt) {
  function makeRequest() {
    return deleteCard(cardIdToDelete).then(() => {
      if (cardToDelete) {
        cardToDelete.remove();
      } else {
        console.error("cardToDelete не определена");
      }
      closePopup(popupConfirmDelete);
    });
  }
  const submitButton = evt.currentTarget;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, "Удаление...");

  makeRequest()
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

// Привязываем обработчик к кнопке подтверждения удаления
buttonConfirmDelete.addEventListener("click", handleDeleteCard);

// ЗАКРЫТЬ ПОПАПЫ НА КНОПКУ ИЛИ ОВЕРЛЕЙ
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

// УПРАВЛЕНИЕ ЛАЙКОМ КАРТОЧКИ
function likeHandler(
  cardId,
  likes,
  cardLikeDescription,
  cardLikeButton,
  currentUserId,
) {
  let isLikedByCurrentUser = likes.some((like) => like._id === currentUserId);

  const likePromise = isLikedByCurrentUser
    ? deleteLike(cardId)
    : addLike(cardId);

  likePromise
    .then((res) => {
      likes.length = 0;
      likes.push(...res.likes);

      cardLikeDescription.textContent = res.likes.length;
      isLikedByCurrentUser = res.likes.some(
        (like) => like._id === currentUserId,
      );

      if (isLikedByCurrentUser) {
        cardLikeButton.classList.add("card__like-button_is-active");
      } else {
        cardLikeButton.classList.remove("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

// ПОЛУЧАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ И РЕНДЕРИМ КАРТОЧКИ НА СТРАНИЦУ

// СОХРАНЯЕМ ТЕКУЩИЙ ID ПОЛЬЗОВАТЕЛЯ
let currentUserId;

function addPageData() {
  Promise.all([getUserInfo(), getInitialCards()])

    .then(([userInfo, cards]) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      currentUserId = userInfo._id;

      renderCards(cards, openImgPopup, currentUserId, openPopupConfirmDelete);
    })
    .catch((err) => console.error(err));
}

addPageData();

export function renderCards(
  cards,
  openImgPopup,
  currentUserId,
  openPopupConfirmDelete,
) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      {
        name: cardData.name,
        link: cardData.link,
        likes: cardData.likes,
        ownerId: cardData.owner._id,
        cardId: cardData._id,
      },
      likeHandler,
      openImgPopup,
      currentUserId,
      openPopupConfirmDelete,
    );

    cardsContainer.appendChild(cardElement);
  });
}

// ВАЛИДАЦИЯ ВСЕХ ФОРМ
enableValidation(validationConfig);
