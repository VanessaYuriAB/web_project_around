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

function openPopup() {
  popupBox.classList.remove("popup-edt_closed");

  const inputsPopups = popupBox.querySelectorAll(".popup-edt__input-form");
  const nameProfile = document.querySelector(".infos__name");
  const aboutProfile = document.querySelector(".infos__about");

  inputsPopups[0].value = nameProfile.textContent;
  inputsPopups[1].value = aboutProfile.textContent;

  // para alternar o estado do botão

  const popupFormEdt = document.querySelector(".popup-edt__container");

  const inputsEdt = Array.from(popupFormEdt.querySelectorAll("input"));
  const buttonEdt = popupFormEdt.querySelector("button");

  toggleButtonState(inputsEdt, buttonEdt);

  // para fechar o formulário edt clicando na tela

  popupBox.addEventListener("click", function (evt) {
    if (!popupFormEdt.contains(evt.target)) {
      closePopup();
    }
  });

  // para fechar o formulário edt com a tecla esc

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  });
}

editBtn.addEventListener("click", openPopup);

// função para fechar o formulário edt

function closePopup() {
  popupBox.classList.add("popup-edt_closed");
}

// para fechar o formulário edt pelo botão de fechar

const closeBtn = document.querySelector(".popup-edt__close-btn");

closeBtn.addEventListener("click", closePopup);

// para salvar as informações do formulário edt

const formElement = document.querySelector(".popup-edt");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let inputsForm = formElement.querySelectorAll(".popup-edt__input-form");
  let nameInput = inputsForm[0];
  let jobInput = inputsForm[1];

  let nameProfile = document.querySelector(".infos__name");
  let jobProfile = document.querySelector(".infos__about");

  // para verificar obrigatoriedade dos campos (popup edt)
  if (nameInput.value.length > 1 && jobInput.value.length > 1) {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    alert("As informações do perfil foram atualizadas com sucesso!");

    closePopup();
  } else {
    alert("Cada campo precisa conter, no mínimo, dois caracteres.");
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// para abrir o formulário add

const addBtn = document.querySelector(".profile__add-btn");
const popupAddBox = document.querySelector(".popup-add");

function openPopupAdd() {
  popupAddBox.classList.remove("popup-add_closed");

  // para fechar o formulário add clicando na tela

  const popupFormAdd = popupAddBox.querySelector(".popup-add__container");

  popupAddBox.addEventListener("click", function (evt) {
    if (!popupFormAdd.contains(evt.target)) {
      closePopupAdd();
    }
  });

  //para fechar o formulário add com a tecla esc
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopupAdd();
    }
  });
}

addBtn.addEventListener("click", openPopupAdd);

// função para fechar o formulário add

function closePopupAdd() {
  popupAddBox.classList.add("popup-add_closed");
}

// para fechar o formulário add pelo botão de fechar

const closeBtnAdd = document.querySelector(".popup-add__close-btn");

closeBtnAdd.addEventListener("click", closePopupAdd);

// para salvar as informações do formulário add

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

  // para verificar obrigatoriedade dos campos (popup add)

  // Using a regular expression to check if the url is a valid one (on DevTools)
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (placeInput.value.length > 1 && urlRegex.test(imageInput.value)) {
    // para adicinar o novo cartão no início da seção
    sectionElements.prepend(boxNewCard);

    // para resetar os inputs do formulário
    placeInput.value = "";
    imageInput.value = "";

    alert("O novo cartão foi incluso com sucesso!");

    closePopupAdd();
  } else {
    alert(
      "O campo para o título precisa conter, no mínimo, dois caracteres. O campo para o link da imagem precisa ser uma URL."
    );
  }
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

  // para fechar o popup do cartão pelo botão de fechar

  const closeBtnPopup = popupCard.querySelector(".popup-card__close-btn");

  closeBtnPopup.addEventListener("click", function () {
    popupCard.remove();
  });

  // para fechar o popup do cartão clicando na tela

  const closeBackgroundPopup = document.querySelector(".popup-card");

  closeBackgroundPopup.addEventListener("click", function (evt) {
    if (!imgPopup.contains(evt.target) && !titlePopup.contains(evt.target)) {
      popupCard.remove();
    }
  });

  // para fechar o popup do cartão pela tecla esc
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popupCard.remove();
    }
  });
});
