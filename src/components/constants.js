// ПОПАП ПРОФИЛЯ
const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// ПОПАП КАРТОЧКИ
const btnAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

// ПОПАП КАРТИНКИ
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

// ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ
const popupConfirmDelete = document.querySelector('.popup__confirm');
const buttonConfirmDelete = document.querySelector('.popup__confirm_button');

// ФОРМА ПРОФИЛЯ
const formProfileEdit = document.forms['edit-profile'];
const nameProfileInput = formProfileEdit.querySelector('.popup__input_type_name');
const aboutProfileInput = formProfileEdit.querySelector('.popup__input_type_description');
const buttonSubmitProfile = formProfileEdit.querySelector('.popup__button_edit-profile');

// ФОРМА КАРТОЧКИ
const formCreateNewCard = document.forms['new-place'];
const titleCardInput = formCreateNewCard.querySelector('.popup__input_type_card-name');
const linkCardInput = formCreateNewCard.querySelector('.popup__input_type_url');
const buttonAddNewCard = formCreateNewCard.querySelector('.popup__button_add-new-card');

// ФОРМА ИЗМЕНЕНИЯ АВАТАРА
const formCreateNewAvatar = document.forms['new-avatar'];
const urlAvatar = formCreateNewAvatar.querySelector('.popup__input_type_avatar_url');
const buttonAvatarSubmit = formCreateNewAvatar.querySelector('.popup__button_new-avatar');

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
    formCreateNewAvatar,
    urlAvatar,
    popupNewAvatar,
    buttonAvatarSubmit,
    buttonAddNewCard
  };