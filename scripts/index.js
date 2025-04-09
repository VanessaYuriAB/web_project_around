// imports
import {
  toggleButtonState,
  hideInputError,
  configEdt,
  configAdd,
} from "./validate.js";

// para inserir os cards iniciais na página, via <template>

const templateInitialCards = document.querySelector("#template-cards").content;
const sectionElements = document.querySelector(".elements__cards");

function loadInitialCards() {
  const initialCards = templateInitialCards.querySelectorAll(".card-elements");

  initialCards.forEach((card) => {
    const cardClone = card.cloneNode(true);

    // para configurar o botão curtir de cada cartão
    const likeBtn = cardClone.querySelector(".card__like-btn");

    likeBtn.classList.remove("card__like-btn_active");

    likeBtn.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-btn_active");
    });

    // para configurar o botão trash de cada cartão
    const trashBtn = cardClone.querySelector(".card__trash-btn");

    trashBtn.addEventListener("click", function (evt) {
      const cardItem = trashBtn.closest(".card-elements");
      cardItem.remove();
    });

    // para adicionar cada cartão na seção
    sectionElements.append(cardClone);
  });
}

loadInitialCards();

// para abrir o formulário edt

const editBtn = document.querySelector(".infos__edit-btn");
const popupBox = document.querySelector(".popup-edt");
const popupFormEdt = document.querySelector(".popup-edt__container");

function openPopup() {
  popupBox.classList.remove("popup-edt_closed");

  let inputsPopup = popupBox.querySelectorAll(".popup-edt__input-form");
  let nameProfile = document.querySelector(".infos__name");
  let aboutProfile = document.querySelector(".infos__about");

  inputsPopup[0].value = nameProfile.textContent;
  inputsPopup[1].value = aboutProfile.textContent;

  // para resetar as msgs de erro ao abrir (edt)
  hideInputError(popupFormEdt, inputsPopup[0], configEdt);
  hideInputError(popupFormEdt, inputsPopup[1], configEdt);

  // para alternar o estado do botão

  const inputsEdt = Array.from(inputsPopup);
  const buttonEdt = popupFormEdt.querySelector("button");

  toggleButtonState(inputsEdt, buttonEdt, configEdt);

  // para fechar o formulário edt clicando na tela

  popupBox.addEventListener("click", function (evt) {
    if (!popupFormEdt.contains(evt.target)) {
      closePopup();
    }
  });

  // para fechar o formulário edt com a tecla esc

  document.addEventListener("keydown", closeEdtWithEsc);
}

editBtn.addEventListener("click", openPopup);

// função para fechar form edt com tecla esc

function closeEdtWithEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// função para fechar o formulário edt

function closePopup() {
  popupBox.classList.add("popup-edt_closed");

  // para remover evento de fechar popups com tecla esc
  document.removeEventListener("keydown", closeEdtWithEsc);
}

// para fechar o formulário edt pelo botão de fechar

const closeBtn = document.querySelector(".popup-edt__icon-close-btn");

closeBtn.addEventListener("click", closePopup);

// para salvar as informações do formulário edt

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let inputsPopup = popupBox.querySelectorAll(".popup-edt__input-form");
  let nameInput = inputsPopup[0];
  let aboutInput = inputsPopup[1];

  let nameProfile = document.querySelector(".infos__name");
  let aboutProfile = document.querySelector(".infos__about");

  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;

  alert("As informações do perfil foram atualizadas com sucesso!");

  closePopup();
}

popupBox.addEventListener("submit", handleProfileFormSubmit);

// para abrir o formulário add

const addBtn = document.querySelector(".profile__add-btn");
const popupAddBox = document.querySelector(".popup-add");
const popupFormAdd = popupAddBox.querySelector(".popup-add__container");

const inputsFormAdd = popupAddBox.querySelectorAll(".popup-add__input-form");

function openPopupAdd() {
  popupAddBox.classList.remove("popup-add_closed");

  // para resetar as msgs de erro ao abrir (add)
  hideInputError(popupFormAdd, inputsFormAdd[0], configAdd);
  hideInputError(popupFormAdd, inputsFormAdd[1], configAdd);

  // para fechar o formulário add clicando na tela

  popupAddBox.addEventListener("click", function (evt) {
    if (!popupFormAdd.contains(evt.target)) {
      popupFormAdd.reset();
      closePopupAdd();
    }
  });

  //para fechar o formulário add com a tecla esc
  document.addEventListener("keydown", closeAddWithEsc);
}

addBtn.addEventListener("click", openPopupAdd);

// função para fechar form add com tecla esc

function closeAddWithEsc(evt) {
  if (evt.key === "Escape") {
    popupFormAdd.reset();
    closePopupAdd();
  }
}

// função para fechar o formulário add

function closePopupAdd() {
  popupFormAdd.reset();
  popupAddBox.classList.add("popup-add_closed");

  document.removeEventListener("keydown", closeAddWithEsc);
}

// para fechar o formulário add pelo botão de fechar

const closeBtnAdd = document.querySelector(".popup-add__icon-close-btn");

closeBtnAdd.addEventListener("click", closePopupAdd);

// para salvar as informações do formulário add

function handleProfileFormAddSubmit(evt) {
  evt.preventDefault();

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
  sectionElements.prepend(boxNewCard);

  // para resetar os inputs do formulário
  placeInput.value = "";
  imageInput.value = "";

  alert("O novo cartão foi incluso com sucesso!");

  closePopupAdd();
}

popupAddBox.addEventListener("submit", handleProfileFormAddSubmit);

// para abrir o popup do cartão
const sectionCards = document.querySelector(".elements__cards");

const templatePopupImg = document.querySelector("#template-popup-img").content;
const popupCard = templatePopupImg.cloneNode(true).firstElementChild;

function openPopupCard(evt) {
  const imgCard = evt.target.closest(".card__image");

  if (!imgCard) return;

  const imgPopup = popupCard.querySelector(".popup-card__image");

  imgPopup.src = imgCard.src;

  const titlePopup = popupCard.querySelector(".popup-card__title");
  const titleCard = imgCard.closest(".card").querySelector(".card__name");

  titlePopup.textContent = titleCard.textContent;

  sectionCards.prepend(popupCard);

  // para fechar o popup do cartão pelo botão de fechar

  const closeBtnPopup = popupCard.querySelector(".popup-card__icon-close-btn");

  closeBtnPopup.addEventListener("click", closePopupCard);

  // para fechar o popup do cartão clicando na tela

  const closeBackgroundPopup = document.querySelector(".popup-card");

  closeBackgroundPopup.addEventListener("click", function (evt) {
    if (!imgPopup.contains(evt.target) && !titlePopup.contains(evt.target)) {
      closePopupCard();
    }
  });

  // para fechar o popup do cartão pela tecla esc
  document.addEventListener("keydown", closePopupWithEsc);
}

sectionCards.addEventListener("click", openPopupCard);

// função para fechar popup com tecla esc

function closePopupWithEsc(evt) {
  if (evt.key === "Escape") {
    closePopupCard();
  }
}

// função para fechar o popup

function closePopupCard() {
  popupCard.remove();
  document.removeEventListener("keydown", closePopupWithEsc);
}
