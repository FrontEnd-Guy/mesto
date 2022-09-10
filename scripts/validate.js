  function showInputError (formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) =>{
      return !inputElement.validity.valid;
    });
  }

  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };


  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', () =>{
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    })
  };

  function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) =>{
        formElement.addEventListener('submit', (evt)=>{
            evt.preventDefault();
        })
        setEventListeners(formElement, config);
    })
  };

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  });