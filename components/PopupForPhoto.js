import Popup from "./Popup.js";

export default class PopupForPhoto extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._submitBtnElement = this._element.querySelector(
      this._config.submitButtonSelector
    );

    // dados já são ajustados aqui
    this._handleSubmit = (evt) => {
      evt.preventDefault();
      handleSubmit(this._getInputValue());
      this.close();
    };

    this._formElement.addEventListener("submit", this._handleSubmit);

    this._formInput = this._formElement.querySelector(
      this._config.inputSelector
    );
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

  setEventListeners() {
    super.setEventListeners();
  }
}
