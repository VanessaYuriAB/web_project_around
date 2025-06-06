import Card from "../components/Card.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import PopupWithForm from "../components/PopupWithForm.js";

import {
  templateCards,
  sectionCards,
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
  configPhoto,
  photoFormElement,
  photoBtnElement,
  profilePhoto,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupForPhoto from "../components/PopupForPhoto.js";

import Api from "../components/Api.js";

//import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// api(fetch): renderiza o card inicial do servidor
const apiServerCard = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f5b337a1-89dd-4f09-826f-0ed62662122f",
    "Content-Type": "application/json",
  },
});

apiServerCard
  .getInitialCards()
  .then((result) => {
    const boxServerCard = templateNewCard
      .querySelector(".card-model")
      .cloneNode(true);

    const titleCard = boxServerCard.querySelector(".card__name");
    const imageCard = boxServerCard.querySelector(".card__image");

    titleCard.textContent = result[0].name;
    imageCard.src = result[0].link;
    imageCard.alt = result[0].name;

    // botão curtir
    const likeButton = boxServerCard.querySelector(".card__like-btn");

    likeButton.classList.remove("card__like-btn_active");

    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-btn_active");
    });

    // botão excluir
    const trashButton = boxServerCard.querySelector(".card__trash-btn");

    trashButton.addEventListener("click", (evt) => {
      const currentCard = evt.target.closest(".card-model");
      currentCard.remove();
    });

    return boxServerCard;
  })
  .then((boxServerCard) => {
    // adiciona o novo cartão no início da seção
    sectionCards.append(boxServerCard);
  })
  .catch((err) => {
    console.log(`Erro ao renderizar o card inicial do servidor: ${err}`);
  });

// section e card: renderiza meus cards iniciais
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

// popupwithimage
const popupCard = new PopupWithImage(configCard.popupSelector);

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

// photo
const photoValidator = new FormValidator(configPhoto, photoFormElement);
photoValidator.enableValidation();

// userinfo: para renderizar as informações do perfil
const profileInfos = new UserInfo({
  nameSelector: ".infos__name",
  aboutSelector: ".infos__about",
});

// popupwithform: abertura e envio
// form edt
const popupEdtProfile = new PopupWithForm(
  configEdt.boxFormSelector,
  // atualiza dados do perfil na página
  (dataProfile) => {
    fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "f5b337a1-89dd-4f09-826f-0ed62662122f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dataProfile.name,
        about: dataProfile.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        // Atualiza as informações do perfil
        profileInfos.setUserInfo(data);
      })
      .catch((err) => {
        console.error(`Erro ao atualizar as informações de perfil: ${err}`);
      });
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

// popupforphoto: abertura e envio
const popupEditPhoto = new PopupForPhoto(
  configPhoto.boxFormSelector,
  // envia a nova foto do perfil
  (dataPhoto) => {
    fetch(
      "https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "f5b337a1-89dd-4f09-826f-0ed62662122f",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          avatar: dataPhoto,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        // Atualiza a imagem do perfil com o novo link do avatar
        profilePhoto.style.backgroundImage = `url(${data.avatar})`;
      })
      .catch((err) => {
        console.error(`Erro ao atualizar a foto de perfil: ${err}`);
      });
  }
);

// listeners de abertura (popups form)
// photo
photoBtnElement.addEventListener("click", () => {
  // reseta estado da validação (msgs de erro e botão)
  photoValidator.resetValidation();

  // abre popup para edição da foto do perfil
  popupEditPhoto.open();
});

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
