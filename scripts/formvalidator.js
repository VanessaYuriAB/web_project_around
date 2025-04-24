class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // verifica a validade do campo
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  // altera o estado do botão Submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // adiciona todos os manipuladores necessários
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // habilita a validação do formulário
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());

    this._setEventListeners();
  }
}

const configForms = {
  edtForm: {
    formSelector: ".popup-edt__container",
    inputSelector: ".popup-edt__input-form",
    submitButtonSelector: ".popup-edt__btn-form",
    inactiveButtonClass: "popup-edt__btn-form_disabled",
    inputErrorClass: "popup-edt__input-error",
  },

  addForm: {
    formSelector: ".popup-add__container",
    inputSelector: ".popup-add__input-form",
    submitButtonSelector: ".popup-add__btn-form",
    inactiveButtonClass: "popup-add__btn-form_disabled",
    inputErrorClass: "popup-add__input-error",
  },
};

Object.values(configForms).forEach((config) => {
  const formElement = document.querySelector(config.formSelector);
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
