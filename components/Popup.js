import {
  configAdd,
  configEdt,
  popupHandlers,
  templatePopupImg,
  configCard,
} from "../utils/constants.js";

export default class Popup {
  //Único parâmetro: o seletor do pop-up.
  constructor(popupSelector) {
    // para popup image
    if (popupSelector === configCard.popupSelector) {
      this._config = configCard;
      this._element = templatePopupImg
        .querySelector(this._config.popupSelector)
        .cloneNode(true);
      // para popups form
    } else {
      this._element = document.querySelector(popupSelector);
      // edt
      if (popupSelector === configEdt.boxFormSelector) {
        this._config = configEdt;
        // add
      } else if (popupSelector === configAdd.boxFormSelector) {
        this._config = configAdd;
      }
    }

    // para todos popups
    this._closeBtnElement = this._element.querySelector(
      this._config.closeButtonSelector
    );
    this._formElement = this._element.querySelector(this._config.formSelector);
  }

  open() {
    // para popups form
    this._element.classList.remove(this._config.closedPopupClass);

    // define listeners de fechamento
    this._handleEscClose();
    this.setEventListeners();
  }

  close() {
    // para popups form
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
