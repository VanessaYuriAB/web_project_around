import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //Função de retorno de chamada do envio do formulário como parâmetro do construtor, assim como o seletor do pop-up.
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._submitBtnElement = this._element.querySelector(
      this._config.submitButtonSelector
    );

    this._originalBtnText = this._submitBtnElement.textContent; // salva o texto original do botão

    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    // dados já são ajustados aqui
    // armazena uma única instância da função de submit para add/remove listener
    this._handleSubmitForm = (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      handleSubmit(this._getInputValues());
    };
  }

  open() {
    super.open();

    // adiciona evento para envio do formulário
    this._formElement.addEventListener("submit", this._handleSubmitForm);
  }

  // informa usuário sobre progresso da solicitação
  renderLoading(isLoading) {
    if (isLoading) {
      // altera texto do botão
      this._submitBtnElement.textContent = "Salvando...";
    } else {
      // retorna texto original
      this._submitBtnElement.textContent = this._originalBtnText;
    }
  }

  //Coleta dados de todos os campos de entrada.
  _getInputValues() {
    // evita dados acumulados em chamadas sucessivas, reset do objeto
    this._formInputValues = {};

    this._formInputs.forEach((inputElement) => {
      this._formInputValues[inputElement.name] = inputElement.value;
    });

    return this._formInputValues;
  }

  close() {
    super.close();

    // remove evento para envio do formulário
    this._formElement.removeEventListener("submit", this._handleSubmitForm);

    //se o formulário for o add -> reseta campos
    if (this._formElement.classList.contains("popup-add__container")) {
      this._formElement.reset();
    }
  }
}
