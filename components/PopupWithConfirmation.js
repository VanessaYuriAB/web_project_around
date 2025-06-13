import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);

    this._currentCard = null;
    this._currentCardId = null;

    this._confirmBtnElement = this._element.querySelector(
      this._config.submitButtonSelector
    );

    this._originalBtnText = this._confirmBtnElement.textContent; // salva o texto original do botão

    // dados já são ajustados aqui
    this._handleConfirm = (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      handleConfirm(this._currentCard); // que recebe a instância
    };

    this._formElement.addEventListener("submit", this._handleConfirm);
  }

  // altera método open da classe mãe, inserindo parâmentros
  open(cardInstance) {
    this._currentCard = cardInstance;
    this._currentCardId = cardInstance._cardId; // definido no argumento da instância do card
    super.open();
  }

  // informa usuário sobre progresso da solicitação
  renderLoading(isLoading) {
    if (isLoading) {
      // altera texto do botão
      this._confirmBtnElement.textContent = "Salvando...";
    } else {
      // retorna texto original
      this._confirmBtnElement.textContent = this._originalBtnText;
    }
  }

  close() {
    super.close();
    this._currentCard = null;
    this._currentCardId = null;
  }
}
