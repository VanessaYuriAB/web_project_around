// para validar os formulários (edt e add)

// o que acontece quando o campo não está válido? obs: a classe do input foi programada com :invalid
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup-edt__input-error");
}

// o que acontece quando o campo está válido?
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove("popup-edt__input-error");
  errorElement.textContent = "";
}

// verificando se o campo está válido ou não para exibir msgs de erro ao usuário
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// há campo inválido? verdadeiro ou falso
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// alternando estados dos botões conforme estados dos campos
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__btn-form_disabled");
  } else {
    buttonElement.classList.remove("popup__btn-form_disabled");
  }
}

// verificando todos os campos para condicionar o botão
function setEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll("input"));
  const button = formElement.querySelector("button");

  toggleButtonState(inputs, button);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, button);
    });
  });
}

// ativando verificação total para todos os formulários
function enableValidation() {
  const forms = Array.from(document.querySelectorAll("form"));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();
