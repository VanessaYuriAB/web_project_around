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

// api(fetch)
const apiPublic = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3c7ad9a7-200c-4d07-b160-7978cd40d815",
  },
});

const apiPrivate = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f5b337a1-89dd-4f09-826f-0ed62662122f",
    "Content-Type": "application/json",
  },
});

// userinfo: para renderizar edições e informações do perfil
const profileInfos = new UserInfo({
  nameSelector: ".infos__name",
  aboutSelector: ".infos__about",
});

// carrega informações do usuário do servidor
apiPrivate
  .getServerUserInfos()
  .then((result) => {
    // renderiza a foto do usuário do servidor
    profilePhoto.style.backgroundImage = `url(${result.avatar})`;
    // renderiza as infos do usuário do servidor
    profileInfos.setUserInfo({
      name: result.name,
      about: result.about,
    });
  })
  .catch((err) => {
    console.log(`Erro ao carregar informações do usuário: ${err}.`);
  });

// renderiza o card inicial do servidor
apiPublic
  .getInitialCard()
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
    console.log(`Erro ao renderizar o card inicial do servidor: ${err}.`);
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

// popupwithform e api: abertura e envio
// form edt
const popupEdtProfile = new PopupWithForm(
  configEdt.boxFormSelector,
  // envia as informações do perfil para o servidor
  (dataProfile) => {
    apiPrivate
      .submitInfosProfile(dataProfile)
      .then((result) => {
        // atualiza as informações do perfil na página
        profileInfos.setUserInfo(result);
      })
      .catch((err) => {
        console.log(`Erro ao atualizar as informações de perfil: ${err}.`);
      });
  }
);

// form add
const popupAddCard = new PopupWithForm(
  configAdd.boxFormSelector,
  // configura e adiciona um novo cartão na página
  (dataCard) => {
    apiPrivate
      .submitNewCard(dataCard)
      .then((result) => {
        const boxNewCard = templateNewCard
          .querySelector(".card-model")
          .cloneNode(true);

        const titleCard = boxNewCard.querySelector(".card__name");
        const imageCard = boxNewCard.querySelector(".card__image");

        titleCard.textContent = result.place; // o name do input é place
        imageCard.src = result.link;
        imageCard.alt = result.place;

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
      })
      .catch((err) => {
        console.log(`Erro ao adicionar o novo cartão na página: ${err}.`);
      });
  }
);

// popupforphoto e api: abertura e envio
const popupEditPhoto = new PopupForPhoto(
  configPhoto.boxFormSelector,
  // envia a nova foto do perfil para o servidor
  (dataPhoto) => {
    apiPrivate
      .submitPhotoprofile(dataPhoto)
      .then((result) => {
        // atualiza a foto do perfil na página
        profilePhoto.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch((err) => {
        console.log(`Erro ao atualizar a foto de perfil: ${err}.`);
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

  // abre popup para edição das infos do perfil
  popupEdtProfile.open();
});

// add
addBtnElement.addEventListener("click", () => {
  // reseta estado da validação (msgs de erro e botão)
  addValidator.resetValidation();

  // abre popup para adição de um novo cartão
  popupAddCard.open();
});
