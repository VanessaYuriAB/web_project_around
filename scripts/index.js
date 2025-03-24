/*para abrir o formulário com as infos do perfil*/

let editBtn = document.querySelector(".infos__edit-btn");
let popupBox = document.querySelector(".popup");

function openPopup() {
  popupBox.classList.toggle("popup_opened");

  let inputsPopups = popupBox.querySelectorAll(".popup__input-form");
  let nameProfile = document.querySelector(".infos__name");
  let aboutProfile = document.querySelector(".infos__about");

  inputsPopups[0].value = nameProfile.textContent;
  inputsPopups[1].value = aboutProfile.textContent;
}

editBtn.addEventListener("click", openPopup);

/*para fechar o formulário*/

let closeBtn = document.querySelector(".popup__close-btn");

function closePopup() {
  popupBox.classList.toggle("popup_opened");
  alert(
    'Nenhuma nova informação foi salva. Caso existam novos dados para inserir e tenha fechado o formulário sem querer, é preciso fazer a edição novamente e clicar no botão "Salvar" antes de fechar o popup.'
  );
}

closeBtn.addEventListener("click", closePopup);

/*para salvar as informações*/

/* CÓDIGO DA PLATAFORMA PARA O EVENTO ESPECIAL SUBMIT: */

// Vamos encontrar o formulário no DOM
let formElement = document.querySelector(".popup");

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
  let inputsForm = formElement.querySelectorAll(".popup__input-form");
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

  let closeForm = document.querySelector(".popup__close-btn");

  function closePopup() {
    popupBox.classList.toggle("popup_opened");
  }

  closePopup();
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);

// para inserir os cards na página

const initialCards = document.querySelector("#template-cards").content;
const sectionElements = document.querySelector(".content__elements");

sectionElements.append(initialCards);
