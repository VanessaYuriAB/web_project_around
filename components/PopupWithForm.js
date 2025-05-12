//classe filha de Popup
class PopupWithForm extends Popup {
  //função de retorno de chamada do envio do formulário como parâmetro do construtor, assim como o seletor do pop-up.
  constructor(callback, popupSelector) {}
  // VERIFICAR PARÂMETROS

  // reseta msgs de erro dos inputs
  const popupForm = popupBox.querySelector(config.formSelector);

  popupInputs.forEach((input) => {
    hideInputError(popupForm, input, config);
  });

  // alterna estado do botão conforme inputs
  const popupSubmitBtn = popupForm.querySelector(config.submitButtonSelector);

  if (extraFunctions && extraFunctions.toggleButtonState) {
    extraFunctions.toggleButtonState(popupInputs, popupSubmitBtn, config);
  }
  // VERIFICAR SOBRE ESTAS FUNÇÕES

  //coleta dados de todos os campos de entrada.
  _getInputValues() {
    // const inputsPopup = Array.from(this._popupSelector.querySelectorAll(".CLASSE DOS INPUTS"));
    }

  //Modificar o método pai close()
  close() {
    // SUPER
    //redefinir o formulário assim que o pop-up for fechado.
    if (this._popupSelector.classList.contains("popup-add__container")) {
      popupForm.reset();
    }
  }

  //Modificar o método pai setEventListeners().
  setEventListeners() {
    // SUPER
    //precisa adicionar o manipulador de eventos Submit ao formulário e o ouvinte de eventos click para o ícone de fechamento.
    this._popupSelector.addEventListener("submit", nomedafunção);
    // VERIFICAR SOBRE SELETOR E FUNÇÃO DE CALLBACK. FUNÇÕES SUBMIT DE CADA FORM ESTÃO NO INDEX.JS.
  }
}

//Criar uma instância da classe PopupWithForm para cada pop-up.
const popupEdtForm = new PopupWithForm();

const popupAddForm = new PopupWithForm();



