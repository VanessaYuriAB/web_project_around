import { configAdd, configEdt, popupHandlers } from "../utils/constants.js";

export default class Popup {
  //Único parâmetro: o seletor do pop-up.
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    if (popupSelector === configEdt.boxFormSelector) {
      this._config = configEdt;
    } else if (popupSelector === configAdd.boxFormSelector) {
      this._config = configAdd;
    }
    this._closeBtnElement = this._element.querySelector(
      this._config.closeButtonSelector
    );
  }

  //Abre e fecha o pop-up.
  open() {
    this._element.classList.remove(this._config.closedPopupClass);
    this._handleEscClose();
  }

  close() {
    this._element.classList.add(this._config.closedPopupClass);

    // remove listeners de fechamento
    this._element.removeEventListener("click", popupHandlers.clickOut);
    document.removeEventListener("keydown", popupHandlers.keyEsc);
    this._closeBtnElement.removeEventListener("click", popupHandlers.closeBtn);
  }

  //Armazena a lógica para fechar o pop-up pressionando a tecla Esc.
  _handleEscClose() {
    popupHandlers.keyEsc = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", popupHandlers.keyEsc);
  }

  //Adiciona um ouvinte de evento click ao ícone de fechamento do popup. A janela modal também deve fechar quando os usuários clicarem na área sombreada em torno do formulário.
  setEventListeners() {
    // fecha popup pelo botão fechar
    popupHandlers.closeBtn = () => {
      this.close();
    };

    this._closeBtnElement.addEventListener("click", popupHandlers.closeBtn);

    // fecha popup clicando na tela
    popupHandlers.clickOut = (evt) => {
      if (
        !this._element
          .querySelector(this._config.formSelector)
          .contains(evt.target)
      ) {
        this.close();
      }
    };

    this._element.addEventListener("click", popupHandlers.clickOut);
  }
}
