
// СОЗДАЕМ КАРТОЧКУ
export function createCard ({name, link}, deleteCard, likeHandler, openImgPopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', likeHandler);

    cardImage.addEventListener('click', () =>
        openImgPopup(name, link)
    );

    return cardElement
}

// УДАЛЯЕМ КАРТОЧКУ
export function deleteCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove()
}

// ВЫВОДИМ КАРТОЧКУ НА СТРАНИЦУ
export function renderCards(cards, openImgPopup) {
    const cardsContainer = document.querySelector('.places__list');

    cards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard, likeHandler, openImgPopup);
        cardsContainer.appendChild(cardElement);
    });
};

// ЛАЙК КАРТОЧКИ
export function likeHandler (evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('card__like-button_is-active')) {
        eventTarget.classList.remove('card__like-button_is-active');
    } else {
        eventTarget.classList.add('card__like-button_is-active');
    }
}
