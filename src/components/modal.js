
// ОТКРЫТЬ ПОПАП

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('click', handleBtnClose);
}

// ЗАКРЫТЬ ПОПАП

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
    document.removeEventListener('click', handleBtnClose);
}

// ЗАКРЫТЬ ПО НАЖАТИЮ Escape

function handleEscClose(evt) {
    const popupElement = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape') {
        closePopup(popupElement);
    }
}

// ЗАКРЫТЬ ПО НАЖАТИЮ НА КНОПКУ

function handleBtnClose (evt) {
    const popupElement = document.querySelector('.popup_is-opened');
    if(popupElement && evt.target.classList.contains('popup__close')) {
        closePopup(popupElement);
    }
}

// ЗАКРЫТЬ ПО НАЖАТИЮ НА ФОН

function handleOverlayClose (evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if(evt.target === openedPopup) {
        closePopup(openedPopup);
    }
}




