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
  };

  function deactivateButton (buttonElement, config) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(config.inactiveButtonClass);
  }

  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "");
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled", "");
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };

  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState (inputList, buttonElement, config);

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

  function deactivateButton(popup, config) {
    const button = popup.querySelector(config.submitButtonSelector);
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  }

  enableValidation(validationCongig);