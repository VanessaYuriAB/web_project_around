/*para abrir o formulário edt*/

let editBtn = document.querySelector(".infos__edit-btn");
let popupBox = document.querySelector(".popup-edt");

function openPopup() {
  popupBox.classList.toggle("popup-edt_opened");

  let inputsPopups = popupBox.querySelectorAll(".popup-edt__input-form");
  let nameProfile = document.querySelector(".infos__name");
  let aboutProfile = document.querySelector(".infos__about");

  inputsPopups[0].value = nameProfile.textContent;
  inputsPopups[1].value = aboutProfile.textContent;
}

editBtn.addEventListener("click", openPopup);

/*para fechar o formulário edt*/

let closeBtn = document.querySelector(".popup-edt__close-btn");

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
let formElement = document.querySelector(".popup-edt");

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
  let inputsForm = formElement.querySelectorAll(".popup-edt__input-form");
  let nameInput = inputsForm[0]; // Use querySelector()
  let jobInput = inputsForm[1]; // Use querySelector()

  // Pegue os valores de cada campo do valor da propriedade correspondente
  nameInput = nameInput.value;
  jobInput = jobInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  let nameProfile = document.querySelector(".infos__name");
  let jobProfile = document.querySelector(".infos__about");

  // Insira novos valores usando a
  // propriedade textContent
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;

  alert("As informações do perfil foram atualizadas com sucesso!");

  let closeForm = document.querySelector(".popup-edt__close-btn");

  function closePopup() {
    popupBox.classList.toggle("popup-edt_opened");
  }

  closePopup();
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);

// para inserir os cards iniciais na página, via <template>

const initialCards = document.querySelector("#template-cards").content;
const sectionElements = document.querySelector(".elements__cards");

/*
function desactiveLikeBtn() {
  likeBtn.classList.remove(".card__like-btn_active");
}

desactiveLikeBtn();
*/

// para configurar o botão curtir dos cartões

/*const likeBtn = initialCards.querySelectorAll(".card__like-btn");

const arrayLikeBtns = Array.from(likeBtn);

arrayLikeBtns.addEventListener("click", function (evt) {
  evt.target.classList.toggle(".card__like-btn_active");
});
*/

sectionElements.append(initialCards);

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

  sectionElements.prepend(boxNewCard);

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
