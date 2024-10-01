// ОТКРЫТЬ ПОПАП
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// ЗАКРЫТЬ ПОПАП
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// ЗАКРЫТЬ ПО НАЖАТИЮ Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popupElement = document.querySelector(".popup_is-opened");
    closePopup(popupElement);
  }
}
