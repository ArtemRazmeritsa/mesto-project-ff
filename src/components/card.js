// СОЗДАЕМ КАРТОЧКУ
const cardTemplate = document.querySelector('#card-template').content;

export function createCard ({name, link, likes, ownerId, cardId}, likeHandler, openImgPopup, currentUserId, openPopupConfirmDelete) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeDescription = cardElement.querySelector('.card__like-description');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardLikeDescription.textContent = likes.length;
    
    // ПРОВЕРЯЕМ КТО СОЗДАЛ КАРТОЧКУ
    if(ownerId !== currentUserId) {
        cardDeleteButton.classList.add('card__delete-button_inactive');
    } else {
        cardDeleteButton.addEventListener('click', () => openPopupConfirmDelete(cardElement, cardId));
    }
    
    cardLikeButton.addEventListener('click', () => likeHandler(cardId, likes, cardLikeDescription, cardLikeButton, currentUserId))
    cardImage.addEventListener('click', () => openImgPopup(name, link));

    return cardElement;
}
