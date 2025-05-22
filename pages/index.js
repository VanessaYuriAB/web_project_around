import Card from "../components/Card.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import PopupWithForm from "../components/PopupWithForm.js";

import {
  templateCards,
  sectionCards,
  profileSelectors,
  configEdt,
  configAdd,
  edtFormElement,
  addFormElement,
  edtBtnElement,
  addBtnElement,
  nameInput,
  aboutInput,
  templateNewCard,
  configCard,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import PopupWithImage from "../components/PopupWithImage.js";

// popupwithimage
const popupCard = new PopupWithImage(configCard.popupSelector);

// section e card: cards iniciais
const initialCards = new Section(
  {
    items: templateCards,
    renderer: (item) => {
      let cardItem = new Card(
        item.text,
        item.imgLink,
        item.cardSelector,
        (evt) => popupCard.open(evt)
      );

      cardItem = cardItem.generateCard();

      initialCards.addItem(cardItem);
    },
  },
  ".elements__cards"
);

initialCards.renderer();

// para abrir popup dos cards inseridos pela página
sectionCards.addEventListener("click", (evt) => {
  popupCard.open(evt);
});

// formvalidator
// edt
const edtValidator = new FormValidator(configEdt, edtFormElement);
edtValidator.enableValidation();

// add
const addValidator = new FormValidator(configAdd, addFormElement);
addValidator.enableValidation();

// userinfo
const profileInfos = new UserInfo({
  nameSelector: profileSelectors.name,
  aboutSelector: profileSelectors.about,
});

// popupwithform e user info
// form edt
const popupEdtProfile = new PopupWithForm(
  configEdt.boxFormSelector,
  // atualiza dados do perfil na página
  (dataProfile) => {
    profileInfos.setUserInfo(dataProfile);
  }
);

// form add
const popupAddCard = new PopupWithForm(
  configAdd.boxFormSelector,
  // configura e adiciona um novo cartão na página
  (dataCard) => {
    const boxNewCard = templateNewCard
      .querySelector(".card-model")
      .cloneNode(true);

    const titleCard = boxNewCard.querySelector(".card__name");
    const imageCard = boxNewCard.querySelector(".card__image");

    titleCard.textContent = dataCard.place;
    imageCard.src = dataCard.link;
    imageCard.alt = dataCard.place;

    // botão curtir
    const likeButton = boxNewCard.querySelector(".card__like-btn");

    likeButton.classList.remove("card__like-btn_active");

    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-btn_active");
    });

    // botão excluir
    const trashButton = boxNewCard.querySelector(".card__trash-btn");

    trashButton.addEventListener("click", (evt) => {
      const currentCard = evt.target.closest(".card-model");
      currentCard.remove();
    });

    // adiciona o novo cartão no início da seção
    sectionCards.prepend(boxNewCard);
  }
);

// listeners de abertura (form)
// edt
edtBtnElement.addEventListener("click", () => {
  // preenche inputs com dados do perfil, antes de abrir
  const { name, about } = profileInfos.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;

  // reseta estado da validação (msgs de erro e botão)
  edtValidator.resetValidation();

  popupEdtProfile.open();
});

// add
addBtnElement.addEventListener("click", () => {
  // reseta estado da validação (msgs de erro e botão)
  addValidator.resetValidation();

  popupAddCard.open();
});
