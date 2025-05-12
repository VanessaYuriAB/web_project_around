import {
  toggleButtonState,
  hideInputError,
  fillEdtPopupInputs,
  configEdt,
  configAdd,
  popupHandlers,
} from "../src/page/index.js";

// Funções de controle dos POPUP FORM (EDT E ADD)
// abre e configura popup
function openPopupForms({ config, extraFunctions }) {
  // abre popup removendo classe 'closed'
  const popupBox = document.querySelector(config.boxFormSelector);

  popupBox.classList.remove(config.closedPopupClass);

  // para o popup edt: preenche inputs com infos do perfil
  const popupInputs = Array.from(
    popupBox.querySelectorAll(config.inputSelector)
  );

  if (extraFunctions && extraFunctions.fillEdtPopupInputs) {
    extraFunctions.fillEdtPopupInputs(popupInputs);
  }

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

  // configura os listeners de fechamento do popup
  const popupCloseBtn = popupBox.querySelector(config.closeButtonSelector);

  setupPopupListeners(
    popupBox,
    popupForm,
    popupCloseBtn,
    config,
    popupHandlers
  );
}

// Funções para o fechamento dos popups form
// função genérica para fechamento
function closePopup(popupBox, popupForm, popupCloseBtn, config, popupHandlers) {
  if (popupForm.classList.contains("popup-add__container")) {
    popupForm.reset();
  }

  popupBox.classList.add(config.closedPopupClass);

  // remove listeners
  popupBox.removeEventListener("click", popupHandlers.clickOut);
  document.removeEventListener("keydown", popupHandlers.keyEsc);
  popupCloseBtn.removeEventListener("click", popupHandlers.closeBtn);
}

// para os listeners de fechamento
function setupPopupListeners(
  popupBox,
  popupForm,
  popupCloseBtn,
  config,
  popupHandlers
) {
  // fecha popup clicando na tela
  popupHandlers.clickOut = (evt) => {
    if (!popupForm.contains(evt.target)) {
      closePopup(popupBox, popupForm, popupCloseBtn, config, popupHandlers);
    }
  };

  popupBox.addEventListener("click", popupHandlers.clickOut);

  // fecha popup com a tecla esc
  popupHandlers.keyEsc = (evt) => {
    if (evt.key === "Escape") {
      closePopup(popupBox, popupForm, popupCloseBtn, config, popupHandlers);
    }
  };

  document.addEventListener("keydown", popupHandlers.keyEsc);

  // fecha popup pelo botão fechar
  popupHandlers.closeBtn = () => {
    closePopup(popupBox, popupForm, popupCloseBtn, config, popupHandlers);
  };

  popupCloseBtn.addEventListener("click", popupHandlers.closeBtn);
}

// Abertura dos popups form (edt e add)
// listeners de abertura
const edtBtn = document.querySelector(".infos__edit-btn");
edtBtn.addEventListener("click", () => {
  openPopupForms({
    config: configEdt,
    extraFunctions: { fillEdtPopupInputs, toggleButtonState },
  });
});

const addBtn = document.querySelector(".profile__add-btn");
addBtn.addEventListener("click", () => {
  openPopupForms({ config: configAdd, extraFunctions: { toggleButtonState } });
});

// POPUP DOS CARDS
// para abrir o popup do cartão
const sectionCards = document.querySelector(".elements__cards");

const templatePopupImg = document.querySelector("#template-popup-img").content;
let currentPopupCard = null;

function openPopupCard(evt) {
  const imgCard = evt.target.closest(".card__image");

  if (!imgCard) return;

  currentPopupCard = templatePopupImg.cloneNode(true).firstElementChild;

  const imgPopup = currentPopupCard.querySelector(".popup-card__image");
  const titlePopup = currentPopupCard.querySelector(".popup-card__title");
  const titleCard = imgCard.closest(".card").querySelector(".card__name");

  imgPopup.src = imgCard.src;
  titlePopup.textContent = titleCard.textContent;
  imgPopup.alt = titlePopup.textContent;

  sectionCards.prepend(currentPopupCard);

  // Desativa o scroll do fundo
  document.body.style.overflow = "hidden";

  // para fechar o popup do cartão pelo botão de fechar

  const closeBtnPopup = currentPopupCard.querySelector(
    ".popup-card__icon-close-btn"
  );

  closeBtnPopup.addEventListener("click", closePopupCard);

  // para fechar o popup do cartão clicando na tela

  currentPopupCard.addEventListener("click", closePopupWithClickOut);

  // para fechar o popup do cartão pela tecla esc
  document.addEventListener("keydown", closePopupWithEsc);
}

sectionCards.addEventListener("click", openPopupCard);

// função para fechar popup clicando na tela
function closePopupWithClickOut(evt) {
  const imgPopup = currentPopupCard.querySelector(".popup-card__image");
  const titlePopup = currentPopupCard.querySelector(".popup-card__title");

  if (!imgPopup.contains(evt.target) && !titlePopup.contains(evt.target)) {
    closePopupCard();
  }

  // Reativa o scroll do fundo
  document.body.style.overflow = ""; // Reseta para o valor padrão
}

// função para fechar popup com tecla esc
function closePopupWithEsc(evt) {
  if (evt.key === "Escape") {
    closePopupCard();
  }

  // Reativa o scroll do fundo
  document.body.style.overflow = ""; // Reseta para o valor padrão
}

// função geral para fechar o popup
function closePopupCard() {
  currentPopupCard.remove();
  document.removeEventListener("keydown", closePopupWithEsc);
  currentPopupCard.removeEventListener("click", closePopupWithClickOut);

  // Reativa o scroll do fundo
  document.body.style.overflow = ""; // Reseta para o valor padrão
}

export { closePopup, setupPopupListeners };
