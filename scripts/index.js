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

// Vamos encontrar o formulário no DOM
const formElement = document.querySelector(".popup-edt");

// Em seguida vem o handler do submit
// ainda não vai enviar para lugar nenhum

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  const inputsForm = formElement.querySelectorAll(".popup-edt__input-form");
  const nameInput = inputsForm[0]; // Use querySelector()
  const jobInput = inputsForm[1]; // Use querySelector()

  // Pegue os valores de cada campo do valor da propriedade correspondente
  nameInput = nameInput.value;
  jobInput = jobInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  const nameProfile = document.querySelector(".infos__name");
  const jobProfile = document.querySelector(".infos__about");

  // Insira novos valores usando a
  // propriedade textContent
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;

  alert("As informações do perfil foram atualizadas com sucesso!");

  const closeForm = document.querySelector(".popup-edt__close-btn");

  function closePopup() {
    popupBox.classList.toggle("popup-edt_opened");
  }

  closePopup();
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
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
