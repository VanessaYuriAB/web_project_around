import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //Função de retorno de chamada do envio do formulário como parâmetro do construtor, assim como o seletor do pop-up.
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._element.querySelector(this._config.formSelector);
    this._submitBtnElement = this._element.querySelector(
      this._config.submitButtonSelector
    );
    this._handleSubmit = (evt) => {
      evt.preventDefault();
      handleSubmit(this._getInputValues());
      // argumento this._formElement ou this._formInputValues?
      this.close();
    };
    this._formInputs = null;
    this._formInputValues = {};
  }

  //Coleta dados de todos os campos de entrada.
  _getInputValues() {
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._formInputs.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });

    return this._formInputValues;
  }

  //Modifica o método pai close(): redefine o formulário assim que o pop-up é fechado.
  close() {
    super.close();

    this._formElement.removeEventListener("submit", this._handleSubmit);

    //se o formulário for o add -> reseta campos
    if (this._formElement.classList.contains("popup-add__container")) {
      this._formElement.reset();
    }
  }

  //Modifica o método pai setEventListeners(): adiciona o manipulador de eventos Submit ao formulário e o ouvinte de eventos click para o ícone de fechamento.
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", this._handleSubmit);
  }
}
