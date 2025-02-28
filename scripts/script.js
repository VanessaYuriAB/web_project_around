/*para abrir o formulário*/

let editBtn = document.querySelector(".infos__edit-btn");
let popupBox = document.querySelector(".popup");

function openPopup() {
  popupBox.classList.toggle("popup_opened");
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
