import UserInfo from "../components/UserInfo.js";

import PopupWithForm from "../components/PopupWithForm.js";

import {
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
  configTrash,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupForPhoto from "../components/PopupForPhoto.js";

import Api from "../components/Api.js";

import { setupLikeButton } from "../utils/utils.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// api(fetch)
const myApi = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3c7ad9a7-200c-4d07-b160-7978cd40d815",
    "Content-Type": "application/json",
  },
});

// userinfo: para renderizar informações do perfil
const profileInfos = new UserInfo({
  nameSelector: ".infos__name",
  aboutSelector: ".infos__about",
});

/*
CÓDIGO COMENTADO PARA INIBIR AÇÃO,
RODADO APENAS PARA ENVIAR OS MEUS CARTÕES INICIAIS.
// envia meus cards iniciais
// myApi.submitMyNewCards();
*/

// carrega informações do meu usuário do servidor e renderiza meus cards iniciais
myApi
  .getServerInfosAndCardsinPromiseAll()
  .then(([serverInfos, serverCards]) => {
    // renderiza a foto do usuário do servidor
    profilePhoto.style.backgroundImage = `url(${serverInfos.avatar})`;
    // renderiza as infos do usuário do servidor
    profileInfos.setUserInfo({
      name: serverInfos.name,
      about: serverInfos.about,
    });

    // renderiza os cartões
    const myCardsData = serverCards.map((card) => {
      const boxServerCard = templateNewCard
        .cloneNode(true)
        .querySelector(".card-model");

      const titleCard = boxServerCard.querySelector(".card__name");
      const imageCard = boxServerCard.querySelector(".card__image");

      titleCard.textContent = card.name;
      imageCard.src = card.link;
      imageCard.alt = card.name;

      // botão curtir
      const likeButton = boxServerCard.querySelector(".card__like-btn");

      const cardId = card._id;

      setupLikeButton(likeButton, cardId, myApi);

      // botão excluir
      const trashButton = boxServerCard.querySelector(".card__trash-btn");

      // verifica se o cartão é o do usuário logado no servidor e não é o cartão que já estava na API
      const currentUserId = serverInfos._id; // ID do usuário logado

      card.owner === currentUserId && card._id !== "683ef584285e50001a4cd806"
        ? // configura o botão excluir
          trashButton.addEventListener("click", (evt) => {
            const currentCard = evt.target.closest(".card-model");

            // abre popup para confirmação de exclusão do card
            popupTrash.open(currentCard, cardId);
          })
        : // desativa o botão excluir
          (trashButton.style.display = "none");

      // retorna cada card configurado
      return boxServerCard;
    });

    // retorna um arrays com objetos de cada card
    return myCardsData;
  })
  .then((myCardsData) => {
    myCardsData.forEach((card) => {
      // adiciona o novo cartão no início da seção
      sectionCards.append(card);
    });
  })
  .catch((err) => {
    console.log(
      `Erro ao carregar informações de usuário e/ou renderizar os cartões iniciais do servidor: ${err}.`
    );
  });

// popupwithimage
const popupCard = new PopupWithImage(configCard.popupSelector);

// para abrir popup dos cards inseridos pela página
sectionCards.addEventListener("click", (evt) => {
  popupCard.open(evt);
});

// popupwithconfirmation: abre e configura popup para confirmação de exclusão de card
const popupTrash = new PopupWithConfirmation(
  configTrash.boxFormSelector,
  (currentCard, cardId) => {
    myApi
      // método da api para excluir o card do servidor
      .deleteCard(cardId)
      .then(() => {
        // exclui o card da página
        currentCard.remove();
      })
      .catch((err) => {
        console.error(`Erro ao deletar o card: ${err}.`);
      })
      .finally(() => {
        popupTrash.renderLoading(false);
      });
  }
);

// popupforphoto e api: abertura e envio: para editar a foto do perfil
const popupEditPhoto = new PopupForPhoto(
  configPhoto.boxFormSelector,
  // envia a nova foto do perfil para o servidor
  (dataPhoto) => {
    myApi
      .submitPhotoProfile(dataPhoto)
      .then((result) => {
        // atualiza a foto do perfil na página
        profilePhoto.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch((err) => {
        console.log(`Erro ao atualizar a foto de perfil: ${err}.`);
      })
      .finally(() => {
        popupEditPhoto.renderLoading(false);
      });
  }
);

// popupwithform e api: abertura e envio
// form edt: para editar infos do perfil
const popupEdtProfile = new PopupWithForm(
  configEdt.boxFormSelector,
  // envia as informações do perfil para o servidor
  (dataProfile) => {
    myApi
      .submitInfosProfile(dataProfile)
      .then((result) => {
        // atualiza as informações do perfil na página
        profileInfos.setUserInfo(result);
      })
      .catch((err) => {
        console.log(`Erro ao atualizar as informações de perfil: ${err}.`);
      })
      .finally(() => {
        popupEdtProfile.renderLoading(false);
      });
  }
);

// form add: para adicionar um novo card na página
const popupAddCard = new PopupWithForm(
  configAdd.boxFormSelector,
  // configura e adiciona um novo cartão na página
  (dataCard) => {
    myApi
      .submitNewCard(dataCard)
      .then((result) => {
        const boxNewCard = templateNewCard
          .cloneNode(true)
          .querySelector(".card-model");

        const titleCard = boxNewCard.querySelector(".card__name");
        const imageCard = boxNewCard.querySelector(".card__image");

        titleCard.textContent = result.name; // o name do input é place, mas o objeto json retornado da api tem o nome da propriedade como name
        imageCard.src = result.link;
        imageCard.alt = result.name;

        // botão curtir
        const likeButton = boxNewCard.querySelector(".card__like-btn");

        const cardId = result._id;

        setupLikeButton(likeButton, cardId, myApi);

        // botão excluir
        const trashButton = boxNewCard.querySelector(".card__trash-btn");

        trashButton.addEventListener("click", (evt) => {
          const currentCard = evt.target.closest(".card-model");

          // abre popup para confirmação de exclusão do card
          popupTrash.open(currentCard, cardId);
        });

        // adiciona o novo cartão no início da seção
        sectionCards.prepend(boxNewCard);
      })
      .catch((err) => {
        console.log(`Erro ao adicionar o novo cartão na página: ${err}.`);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
);

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
