// ПОПАП ПРОФИЛЯ
const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// ПОПАП КАРТОЧКИ
const btnAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

// ПОПАП КАРТИНКИ
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// ФОРМА ПРОФИЛЯ
const formProfileEdit = document.forms['edit-profile'];
const nameProfileInput = formProfileEdit.querySelector('.popup__input_type_name');
const jobProfileInput = formProfileEdit.querySelector('.popup__input_type_description');

// ФОРМА КАРТОЧКИ
const formCreateNewCard = document.forms['new-place'];
const titleCardInput = formCreateNewCard.querySelector('.popup__input_type_card-name');
const linkCardInput = formCreateNewCard.querySelector('.popup__input_type_url');

// КОНТЕЙНЕР ДЛЯ КАРТОЧЕК
const cardsContainer = document.querySelector('.places__list');

// ВЫБИРАЕМ ВСЕ ПОПАПЫ
const popups = document.querySelectorAll('.popup');


export { 
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
  };