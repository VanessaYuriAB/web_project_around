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
}

closeBtn.addEventListener("click", closePopup);
