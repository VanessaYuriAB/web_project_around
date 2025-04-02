/*para abrir o formulário edt*/

const editBtn = document.querySelector(".infos__edit-btn");
const popupBox = document.querySelector(".popup-edt");

function openPopup() {
  popupBox.classList.toggle("popup-edt_opened");

  const inputsPopups = popupBox.querySelectorAll(".popup-edt__input-form");
  const nameProfile = document.querySelector(".infos__name");
  const aboutProfile = document.querySelector(".infos__about");

  inputsPopups[0].value = nameProfile.textContent;
  inputsPopups[1].value = aboutProfile.textContent;
}

editBtn.addEventListener("click", openPopup);

/*para fechar o formulário edt*/

const closeBtn = document.querySelector(".popup-edt__close-btn");

function closePopup() {
  popupBox.classList.toggle("popup-edt_opened");
  alert(
    'Nenhuma nova informação foi salva. Caso existam novos dados para inserir e tenha fechado o formulário sem querer, é preciso fazer a edição novamente e clicar no botão "Salvar" antes de fechar o popup.'
  );
}

closeBtn.addEventListener("click", closePopup);

/*para salvar as informações do formulário edt*/

/* CÓDIGO DA PLATAFORMA PARA O EVENTO ESPECIAL SUBMIT: */

// VAMOS ENCONTRAR O FORMULÁRIO NO DOM
let formElement = document.querySelector(".popup-edt");

// EM SEGUIDA VEM O HANDLER DO SUBMIT, AINDA NÃO VAI ENVIAR PARA LUGAR NENHUM

// OBSERVE QUE O NOME DA FUNÇÃO COMEÇA COM UM VERBO E DESCREVE EXATAMENTE O QUE A FUNÇÃO FAZ
function handleProfileFormSubmit(evt) {
  // ESTA LINHA IMPEDE O NAVEGADOR DE ENVIAR O FORMULÁRIO DA FORMA PADRÃO
  evt.preventDefault();
  // FZD ISSO, PODEMOS DEFINIR NOSSA PRÓPRIA FORMA DE ENVIAR O FORMULÁRIO. EXPLICAREMOS MAIS DETALHES POSTERIORMENTE.

  // VMS ENCONTRAR OS CAMPOS DE FORMULÁRIO DO DOM
  let inputsForm = formElement.querySelectorAll(".popup-edt__input-form");
  let nameInput = inputsForm[0]; // USE QUERYSELECTOR()
  let jobInput = inputsForm[1]; // USE QUERYSELECTOR()

  // PEQUE OS VALORES DE CADA CAMPO DO VALOR DA PROPRIEDADE CORRESPONDENTE
  nameInput = nameInput.value;
  jobInput = jobInput.value;

  // SELECIONE OS ELEMENTOS AOS QUAIS OS VALORES DOS CAMPOS SERÃO INSERIDOS
  let nameProfile = document.querySelector(".infos__name");
  let jobProfile = document.querySelector(".infos__about");

  // INSIRA NOVOS VALORES USANDO A PROPRIEDADE .TEXTCONTENT
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;

  alert("As informações do perfil foram atualizadas com sucesso!");

  let closeForm = document.querySelector(".popup__close-btn");

  function closePopup() {
    popupBox.classList.toggle("popup-edt_opened");
  }

  closePopup();
}

// CONECTE O HANDLER AO FORMLÁRIO, ELE VAI OBSERVAR O EVENTO DE SUBMIT
formElement.addEventListener("submit", handleProfileFormSubmit);

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

// para abrir o formulário add

const addBtn = document.querySelector(".profile__add-btn");
const popupAddBox = document.querySelector(".popup-add");

function openPopupAdd() {
  popupAddBox.classList.toggle("popup-add_opened");
}

addBtn.addEventListener("click", openPopupAdd);

/*para fechar o formulário add*/

const closeBtnAdd = document.querySelector(".popup-add__close-btn");

function closePopupAdd() {
  popupAddBox.classList.toggle("popup-add_opened");
  alert(
    'Nenhuma nova informação foi salva. Caso existam novos dados para inserir e tenha fechado o formulário sem querer, é preciso fazer a edição novamente e clicar no botão "Salvar" antes de fechar o popup.'
  );
}

closeBtnAdd.addEventListener("click", closePopupAdd);

//para salvar as informações do formulário add*/

const formAddElement = document.querySelector(".popup-add");

function handleProfileFormAddSubmit(evt) {
  evt.preventDefault();

  const inputsFormAdd = formAddElement.querySelectorAll(
    ".popup-add__input-form"
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
  sectionElements.prepend(boxNewCard);

  // para resetar os inputs do formulário
  placeInput.value = "";
  imageInput.value = "";

  alert("O novo cartão foi incluso com sucesso!");

  const closeFormAdd = document.querySelector(".popup-add__close-btn");

  function closePopupAdd() {
    popupAddBox.classList.toggle("popup-add_opened");
  }

  closePopupAdd();
}

formAddElement.addEventListener("submit", handleProfileFormAddSubmit);

// para abrir o popup do cartão
const sectionCards = document.querySelector(".elements__cards");

sectionCards.addEventListener("click", function (evt) {
  const imgCard = evt.target.closest(".card__image");

  if (!imgCard) return;

  const templatePopupImg = document.querySelector(
    "#template-popup-img"
  ).content;
  const popupCard = templatePopupImg.cloneNode(true).firstElementChild;

  const imgPopup = popupCard.querySelector(".popup-card__image");

  imgPopup.src = imgCard.src;

  const titlePopup = popupCard.querySelector(".popup-card__title");
  const titleCard = imgCard.closest(".card").querySelector(".card__name");

  titlePopup.textContent = titleCard.textContent;

  sectionCards.prepend(popupCard);

  // para fechar o popup do cartão
  const closeBtnPopup = popupCard.querySelector(".popup-card__close-btn");

  closeBtnPopup.addEventListener("click", function () {
    popupCard.remove();
  });
});

// para validar os formulários (edt e add)

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup-edt__input-error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove("popup-edt__input-error");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__btn-form_disabled");
  } else {
    buttonElement.classList.remove("popup__btn-form_disabled");
  }
}

function setEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll("input"));
  const button = formElement.querySelector("button");

  toggleButtonState(inputs, button);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, button);
    });
  });
}

function enableValidation() {
  const forms = Array.from(document.querySelectorAll("form"));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();
