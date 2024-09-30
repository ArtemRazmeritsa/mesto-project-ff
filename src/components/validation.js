export const validationConfig = {
  popupElement: ".popup",
  inputElement: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ПОКАЗАТЬ ОШИБКУ
function showInputError(
  popupElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass,
) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// СКРЫТЬ ОШИБКУ
function hideInputError(
  popupElement,
  inputElement,
  inputErrorClass,
  errorClass,
) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

// ВАЛИДАЦИЯ ИНПУТА
export function isValid(
  popupElement,
  inputElement,
  inputErrorClass,
  errorClass,
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      popupElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass,
    );
  } else {
    hideInputError(popupElement, inputElement, inputErrorClass, errorClass);
  }
}

// ВАЛИДАЦИЯ ВСЕХ ИНПУТОВ В ФОРМЕ
function setEventListeners(popupElement, config) {
  const inputList = Array.from(
    popupElement.querySelectorAll(config.inputElement),
  );
  const popupSubmitButton = popupElement.querySelector(
    config.submitButtonSelector,
  );

  toggleButtonState(inputList, popupSubmitButton, config.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(
        popupElement,
        inputElement,
        config.inputErrorClass,
        config.errorClass,
      );
      toggleButtonState(
        inputList,
        popupSubmitButton,
        config.inactiveButtonClass,
      );
    });
  });
}

// ВАЛИДАЦИЯ ВСЕХ ИНПУТОВ В ФОРМЕ ДЛЯ УПРАВЛЕНИЕМ СОСТОЯНИЯ КНОПКИ
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// УПРАВЛЕНИЕ СОСТОЯНИЯ КНОПКИ ОТПРАВКИ ФОРМЫ
export function toggleButtonState(
  inputList,
  buttonElement,
  inactiveButtonClass,
) {
  if (buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }
}

// УДАЛИТЬ ОШИБКИ И СДЕЛАТЬ КНОПКУ ОТПРАВКИ ФОРМЫ НЕАКТИВНОЙ ПРИ ОТКРЫТИИ
export function clearValidation(popupElement, config) {
  const inputList = Array.from(
    popupElement.querySelectorAll(config.inputElement),
  );
  const popupSubmitButton = popupElement.querySelector(
    config.submitButtonSelector,
  );

  inputList.forEach((inputElement) => {
    hideInputError(
      popupElement,
      inputElement,
      config.inputErrorClass,
      config.errorClass,
    );
  });
  toggleButtonState(inputList, popupSubmitButton, config.inactiveButtonClass);
}

// ВАЛИДАЦИЯ ВСЕХ ФОРМ
export function enableValidation(config) {
  const popupList = Array.from(document.querySelectorAll(config.popupElement));

  popupList.forEach((popupElement) => {
    setEventListeners(popupElement, config);
  });
}
