import { popupHandlers } from "../src/pages/index.js";

//abre e fecha a janela pop-up
class Popup {
  //único parâmetro, que é o seletor do pop-up.

  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  //abrirão e fecharão o pop-up.
  open() {
    this._popupSelector.classList.remove(config.closedPopupClass);
    // VERIFICAR SOBRE A CLASSE A SER REMOVIDA
  }

  close() {
    this._popupSelector.classList.add(config.closedPopupClass);
    // VERIFICAR SOBRE A CLASSE A SER REMOVIDA

    // remove listeners
    this._popupSelector.removeEventListener("click", popupHandlers.clickOut);
    document.removeEventListener("keydown", popupHandlers.keyEsc);
    popupCloseBtn.removeEventListener("click", popupHandlers.closeBtn);
    // VERIFICAR SOBRE POPUPcLOSEbTN
  }

  //armazena a lógica para fechar o pop-up pressionando a tecla Esc.
  _handleEscClose() {
    popupHandlers.keyEsc = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", popupHandlers.keyEsc);
  }

  //adiciona um ouvinte de evento click ao ícone de fechamento do popup. A janela modal também deve fechar quando os usuários clicarem na área sombreada em torno do formulário.
  setEventListeners() {
    // fecha popup pelo botão fechar
    popupHandlers.closeBtn = () => {
      this.close();
    };

    popupCloseBtn.addEventListener("click", popupHandlers.closeBtn);
    // VERIFICAR SOBRE POPUPcLOSEbTN

    // fecha popup clicando na tela
    popupHandlers.clickOut = (evt) => {
      if (!this._popupSelector.contains(evt.target)) {
        this.close();
      }
    };
  }
}
