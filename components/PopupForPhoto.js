import Popup from "./Popup.js";

export default class PopupForPhoto extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._submitBtnElement = this._element.querySelector(
      this._config.submitButtonSelector
    );

    this._originalBtnText = this._submitBtnElement.textContent; // salva o texto original do botão

    // dados já são ajustados aqui
    this._handleSubmit = (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      handleSubmit(this._getInputValue());
    };

    this._formElement.addEventListener("submit", this._handleSubmit);

    this._formInput = this._formElement.querySelector(
      this._config.inputSelector
    );
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

  //Coleta o link para a nova foto.
  _getInputValue() {
    return this._formInput.value;
  }

  close() {
    super.close();

    // reseta campo do popup
    this._formElement.reset();
  }
}
