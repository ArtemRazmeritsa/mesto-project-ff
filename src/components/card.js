// СОЗДАЕМ КАРТОЧКУ
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  likeHandler,
  openImgPopup,
  currentUserId,
  openPopupConfirmDelete
) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeDescription = cardElement.querySelector(
    ".card__like-description"
  );

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeDescription.textContent = cardData.likes.length;

  // ПРОВЕРЯЕМ КТО СОЗДАЛ КАРТОЧКУ
  if (cardData.ownerId !== currentUserId) {
    cardDeleteButton.classList.add("card__delete-button_inactive");
  } else {
    cardDeleteButton.addEventListener("click", () =>
      openPopupConfirmDelete(cardElement, cardData.cardId)
    );
  }

  const isLikedByCurrentUser = cardData.likes.some(
    (like) => like._id === currentUserId
  );
  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () =>
    likeHandler(
      cardData.cardId,
      cardData.likes,
      cardLikeDescription,
      cardLikeButton,
      currentUserId
    )
  );
  cardImage.addEventListener("click", () =>
    openImgPopup(cardData.name, cardData.link)
  );

  return cardElement;
}
