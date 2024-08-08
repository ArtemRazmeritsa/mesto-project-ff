function createCard ({name, link}, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    console.log('Creating card with data:', { name, link });
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardDeleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

function deleteCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove()
}

function renderCards(cards) {
    const cardsContainer = document.querySelector('.places__list');

    cards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        cardsContainer.appendChild(cardElement);
    });
};

renderCards(initialCards);


