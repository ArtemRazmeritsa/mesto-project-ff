import './pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeHandler} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
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
    jobProfileInput,
    titleCardInput,
    linkCardInput,
    popupImageElement,
    popupCaption,
    popups
} from './components/constants.js';


// ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ И УСТАНОВКИ ЗНАЧЕНИЙ ПОЛЕЙ ВВОДА
function openEditProfilePopup() {
    nameProfileInput.value = profileTitle.textContent;
    jobProfileInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
}

// РЕДАКТИРОВАТЬ ПРОФИЛЬ
function handleProfileEditForm(evt) {
    evt.preventDefault();

    const nameInputValue = nameProfileInput.value;
    const jobInputValue = jobProfileInput.value;

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    
    closePopup(popupEditProfile);
}

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
btnOpenEditProfile.addEventListener('click', openEditProfilePopup);

// СОХРАНИТЬ И ЗАКРЫТЬ ПОПАП ПРОФИЛЯ
formProfileEdit.addEventListener('submit', handleProfileEditForm);

// ДОБАВИТЬ КАРТОЧКУ
function handleCreateNewCard (evt) {
    evt.preventDefault();

    const titleInputValue = titleCardInput.value;
    const linkInputValue = linkCardInput.value;

    const newCard = createCard({name: titleInputValue, link: linkInputValue}, deleteCard, likeHandler, openImgPopup);

    cardsContainer.prepend(newCard);
    closePopup(popupAddNewCard);
    
    titleCardInput.value = "";
    linkCardInput.value = "";
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

// ЗАКРЫТЬ ПОПАПЫ НА КНОПКУ ИЛИ ОВЕРЛЕЙ
popups.forEach((popup) => {
 popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
   closePopup(popup);
  }
 });
}); 

// РЕНДЕРИМ КАРТОЧКИ НА СТРАНИЦУ
export function renderCards(cards, openImgPopup) {

    cards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard, likeHandler, openImgPopup);
        cardsContainer.appendChild(cardElement);
    });
};

renderCards(initialCards, openImgPopup);


