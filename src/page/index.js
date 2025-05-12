// imports
import Card from "../../components/Card.js";

import FormValidator from "../../components/FormValidator.js";

import { closePopup } from "../../script/utils.js";

// implementação da class Card
const templateCards = [
  {
    text: "Japão, Monte Fuji",
    imgLink: "./images/monte-fuji_japão_popup.jpg",
    cardSelector: "#popup-jp",
  },
  {
    text: "Portugal, Porto",
    imgLink: "./images/porto_portugal__popup.jpg",
    cardSelector: "#popup-pt",
  },
  {
    text: "Itália, Matera",
    imgLink: "./images/matera_itália_popup.jpg",
    cardSelector: "#popup-it",
  },
  {
    text: "Filipinas, El Nido",
    imgLink: "./images/el-nido_filipinas_popup.jpg",
    cardSelector: "#popup-fl",
  },
  {
    text: "Noruega, Lofoten",
    imgLink: "./images/lofoten_noruega_popup.jpg",
    cardSelector: "#popup-nr",
  },
  {
    text: "Suécia, Kiruna",
    imgLink: "./images/kiruna_suécia_popup.jpg",
    cardSelector: "#popup-sc",
  },
];

templateCards.forEach((dataCard) => {
  const sectionCards = document.querySelector(".elements__cards");

  let cardItem = new Card(
    dataCard.text,
    dataCard.imgLink,
    dataCard.cardSelector
  );

  cardItem = cardItem.generateCard();

  sectionCards.append(cardItem);
});

// implementação da class FormValidator
const configForms = {
  edtForm: {
    formSelector: ".popup-edt__container",
    inputSelector: ".popup-edt__input-form",
    submitButtonSelector: ".popup-edt__btn-form",
    inactiveButtonClass: "popup-edt__btn-form_disabled",
    inputErrorClass: "popup-edt__input-error",
  },

  addForm: {
    formSelector: ".popup-add__container",
    inputSelector: ".popup-add__input-form",
    submitButtonSelector: ".popup-add__btn-form",
    inactiveButtonClass: "popup-add__btn-form_disabled",
    inputErrorClass: "popup-add__input-error",
  },
};

Object.values(configForms).forEach((config) => {
  const formElement = document.querySelector(config.formSelector);
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

// para salvar as informações do formulário edt
const popupBox = document.querySelector(".popup-edt");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameProfile = document.querySelector(".infos__name");
  const aboutProfile = document.querySelector(".infos__about");

  const inputsPopup = Array.from(
    popupBox.querySelectorAll(".popup-edt__input-form")
  );

  const nameInput = inputsPopup[0];
  const aboutInput = inputsPopup[1];

  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;

  // fecha o popup, removendo listeners
  const popupForm = popupBox.querySelector(configEdt.formSelector);
  const closeBtn = popupBox.querySelector(configEdt.closeButtonSelector);

  closePopup(popupBox, popupForm, closeBtn, configEdt, popupHandlers);
}

popupBox.addEventListener("submit", handleProfileFormSubmit);

// para salvar as informações do formulário add
const popupAddBox = document.querySelector(".popup-add");

function handleProfileFormAddSubmit(evt) {
  evt.preventDefault();

  const inputsFormAdd = Array.from(
    popupAddBox.querySelectorAll(".popup-add__input-form")
  );

  const placeInput = inputsFormAdd[0];
  const imageInput = inputsFormAdd[1];

  const templateNewCard = document.querySelector(
    "#template-model-card"
  ).content;
  const boxNewCard = templateNewCard
    .querySelector(".card-model")
    .cloneNode(true);

  const titleCard = boxNewCard.querySelector(".card__name");
  const imageCard = boxNewCard.querySelector(".card__image");

  titleCard.textContent = placeInput.value;
  imageCard.src = imageInput.value;

  imageCard.alt = `${placeInput.value}`;

  // para configurar o botão curtir do novo cartão
  const likeButton = boxNewCard.querySelector(".card__like-btn");

  likeButton.classList.remove("card__like-btn_active");

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
  });

  // para configurar o botão trash do novo cartão
  const trashButton = boxNewCard.querySelector(".card__trash-btn");

  trashButton.addEventListener("click", function (evt) {
    const newCardItem = trashButton.closest(".card-model");
    newCardItem.remove();
  });

  // para adicinar o novo cartão no início da seção
  const sectionElements = document.querySelector(".elements__cards");
  sectionElements.prepend(boxNewCard);

  // para resetar os inputs do formulário
  placeInput.value = "";
  imageInput.value = "";

  // fecha o popup, removendo listeners
  const popupBox = document.querySelector(configAdd.boxFormSelector);
  const popupForm = popupBox.querySelector(configAdd.formSelector);
  const closeBtn = popupBox.querySelector(configAdd.closeButtonSelector);

  closePopup(popupBox, popupForm, closeBtn, configAdd, popupHandlers);
}

popupAddBox.addEventListener("submit", handleProfileFormAddSubmit);

// Funções utilitárias (gerais)
// há campo inválido? verdadeiro ou falso
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// alterna o estado dos botões conforme o estado dos campos
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// recolhe msg de erro dos inputs
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}

// preenche campos do popup edt
function fillEdtPopupInputs(popupInputs) {
  const profileName = document.querySelector(".infos__name");
  const profileAbout = document.querySelector(".infos__about");

  popupInputs[0].value = profileName.textContent;
  popupInputs[1].value = profileAbout.textContent;
}

// objetos de configuração edt e add
const configEdt = {
  boxFormSelector: ".popup-edt",
  formSelector: ".popup-edt__container",
  inputSelector: ".popup-edt__input-form",
  submitButtonSelector: ".popup-edt__btn-form",
  closeButtonSelector: ".popup-edt__icon-close-btn",
  closedPopupClass: "popup-edt_closed",
  inactiveButtonClass: "popup-edt__btn-form_disabled",
  inputErrorClass: "popup-edt__input-error",
};

const configAdd = {
  boxFormSelector: ".popup-add",
  formSelector: ".popup-add__container",
  inputSelector: ".popup-add__input-form",
  submitButtonSelector: ".popup-add__btn-form",
  closeButtonSelector: ".popup-add__icon-close-btn",
  closedPopupClass: "popup-add_closed",
  inactiveButtonClass: "popup-add__btn-form_disabled",
  inputErrorClass: "popup-add__input-error",
};

// objeto para handlers
const popupHandlers = { clickOut: null, keyEsc: null, closeBtn: null };

export {
  toggleButtonState,
  hideInputError,
  fillEdtPopupInputs,
  configEdt,
  configAdd,
  popupHandlers,
};
