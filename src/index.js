import './pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, renderCards, likeHandler} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

// ПОПАП ПРОФИЛЯ
const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

// ПОПАП КАРТОЧКИ
const btnAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

// ПОПАП КАРТИНКИ
const popupImage = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.places__item');

// ФОРМЫ
const formProfileEdit = document.forms['edit-profile'];
const formCreateNewCard = document.forms['new-place'];

// РЕДАКТИРОВАТЬ ПРОФИЛЬ
function handleProfileEditForm(evt) {
    evt.preventDefault();

    const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
    const jobInput = formProfileEdit.querySelector('.popup__input_type_description');

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
    
    closePopup(popupEditProfile);
}

formProfileEdit.addEventListener('submit', handleProfileEditForm);

// ДОБАВИТЬ КАРТОЧКУ
function handleCreateNewCard (evt) {
    evt.preventDefault();

    const titleInput = formCreateNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = formCreateNewCard.querySelector('.popup__input_type_url');

    const titleInputValue = titleInput.value;
    const linkInputValue = linkInput.value;

    const newCard = createCard({name: titleInputValue, link: linkInputValue}, deleteCard, likeHandler, openImgPopup);


    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.prepend(newCard);
    closePopup(popupAddNewCard);
}

formCreateNewCard.addEventListener('submit', handleCreateNewCard);

// ОТКРЫТЬ ПОПАП КАРТОЧКИ
function openImgPopup(name, link) {
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;

    openPopup(popupImage);
}

// ОТКРЫТЬ ПОПАП ПРОФИЛЯ
btnOpenEditProfile.addEventListener('click', () => openPopup(popupEditProfile));

// ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
btnAddNewCard.addEventListener('click', () => openPopup(popupAddNewCard));

// РЕНДЕРИМ КАРТОЧКИ НА СТРАНИЦУ
renderCards(initialCards, openImgPopup);


