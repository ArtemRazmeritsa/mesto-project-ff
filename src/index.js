import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validationConfig } from './components/validation.js';
import { getUserInfo, getInitialCards, saveNewUserData, addNewCard, deleteCard, addLike, deleteLike, updateAvatar} from './api.js';
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
    buttonAvatarSubmit,
    buttonAddNewCard
} from './components/constants.js';


// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ И УСТАНОВКИ ЗНАЧЕНИЙ ПОЛЕЙ ВВОДА
function openEditProfilePopup() {
    nameProfileInput.value = profileTitle.textContent;
    aboutProfileInput.value = profileDescription.textContent;
    buttonSubmitProfile.classList.add(validationConfig.inactiveButtonClass);
    openPopup(popupEditProfile);
}


// РЕДАКТИРОВАТЬ ПРОФИЛЬ
function handleProfileEditForm(evt) {
    evt.preventDefault();
    
    const nameInputValue = nameProfileInput.value;
    const aboutInputValue = aboutProfileInput.value;
   
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = aboutInputValue;
    saveNewUserData(nameInputValue, aboutInputValue);
    
    closePopup(popupEditProfile);
}

// СМЕНИТЬ АВАТАР
function handleUpdateNewAvatar(evt) {
    evt.preventDefault();

    const avatarUrl = urlAvatar.value;
    buttonAvatarSubmit.textContent = 'Сохранение...';

    updateAvatar(avatarUrl)
    .then(() => {
        profileImage.style.backgroundImage = `url(${avatarUrl})`;
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        buttonAvatarSubmit.textContent = 'Сохранить';
        closePopup(popupNewAvatar);
    });
}

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
btnOpenEditProfile.addEventListener('click', openEditProfilePopup);

// ОТКРЫТЬ ПОПАП ИЗМЕНЕНИЯ АВАТАРА
profileImage.addEventListener('click', () => openPopup(popupNewAvatar));

// СОХРАНИТЬ И ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
formProfileEdit.addEventListener('submit', handleProfileEditForm);

// СОХРАНИТЬ И ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
formCreateNewAvatar.addEventListener('submit', handleUpdateNewAvatar);


// ДОБАВИТЬ КАРТОЧКУ
function handleCreateNewCard (evt) {
    evt.preventDefault();

    const titleInputValue = titleCardInput.value;
    const linkInputValue = linkCardInput.value;
    buttonAddNewCard.textContent = 'Сохранение...';

    const newCardData = {
        name: titleInputValue,
        link: linkInputValue
    };

    addNewCard(newCardData)
    .then(cardDataFromServer => {
        const newCard = createCard({
            name: cardDataFromServer.name,
            link: cardDataFromServer.link,
            likes: cardDataFromServer.likes,
            ownerId: cardDataFromServer.owner._id,
            cardId: cardDataFromServer._id
        }, likeHandler, openImgPopup, currentUserId, openPopupConfirmDelete);
        cardsContainer.prepend(newCard);
    })

    .finally(() => {
        buttonAddNewCard.textContent = 'Сохранить';
        titleCardInput.value = '';
        linkCardInput.value = '';
        closePopup(popupAddNewCard);
    })
    .catch(err => {
        console.error(`Ошибка добавления карточки: ${err}`);
    });
}

// ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
btnAddNewCard.addEventListener('click', () => openPopup(popupAddNewCard));

// ДОБАВИТЬ КАРТОЧКУ И ЗАКРЫТЬ ПОПАП КАРТОЧКИ
formCreateNewCard.addEventListener('submit', handleCreateNewCard);

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
export function handleDeleteCard() {
    buttonConfirmDelete.textContent = 'Удаление...'
    deleteCard(cardIdToDelete)
        .then(() => {
            if (cardToDelete) {
                cardToDelete.remove();
            } else {
                console.error('cardToDelete не определена');
            }
            buttonConfirmDelete.textContent = 'Да'
            closePopup(popupConfirmDelete);
        })
        .catch(err => {
            console.error(`Ошибка при удалении карточки: ${err}`);
        });
}

buttonConfirmDelete.addEventListener('click', handleDeleteCard)

// ЗАКРЫТЬ ПОПАПЫ НА КНОПКУ ИЛИ ОВЕРЛЕЙ
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
    closePopup(popup);
    }
    });
});

// УПРАВЛЕНИЕ ЛАЙКОМ КАРТОЧКИ
function likeHandler(cardId, likes, cardLikeDescription, cardLikeButton, currentUserId) {
    let isLikedByCurrentUser = likes.some(like => like._id === currentUserId);

    const likePromise = isLikedByCurrentUser ? deleteLike(cardId) : addLike(cardId);

    likePromise
        .then((res) => {
            likes.length = 0;
            likes.push(...res.likes);

            cardLikeDescription.textContent = res.likes.length;
            isLikedByCurrentUser = res.likes.some(like => like._id === currentUserId);

         
            if (isLikedByCurrentUser) {
                cardLikeButton.classList.add('card__like-button_is-active');
            } else {
                cardLikeButton.classList.remove('card__like-button_is-active');
            }
        })
        .catch((err) => {
            console.error(err);
        });
}


// ПОЛУЧАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ И РЕНДЕРИМ КАРТОЧКИ НА СТРАНИЦУ

// СОХРАНЯЕМ ТЕКУЩИЙ ID ПОЛЬЗОВАТЕЛЯ
let currentUserId;

function addPageData () {
    Promise.all([getUserInfo(), getInitialCards()])
 
    .then(([userInfo, cards]) => {
        
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
        currentUserId = userInfo._id;

        renderCards(cards, openImgPopup, currentUserId, openPopupConfirmDelete);
        })
    .catch(err => console.error(err));
}

addPageData ()

export function renderCards(cards, openImgPopup, currentUserId, openPopupConfirmDelete) {
    cards.forEach(cardData => {
        const cardElement = createCard({
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            ownerId: cardData.owner._id,
            cardId: cardData._id
        }, likeHandler, openImgPopup, currentUserId, openPopupConfirmDelete);
        
        if (cardData.likes.some(like => like._id === currentUserId)) {
            const cardLikeButton = cardElement.querySelector('.card__like-button');
            cardLikeButton.classList.add('card__like-button_is-active');
        }

        cardsContainer.appendChild(cardElement);
    });
};

// ВАЛИДАЦИЯ ВСЕХ ФОРМ
enableValidation(validationConfig);



