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

import toggleLike from "../utils/utils.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import Section from "../components/Section.js";

import Card from "../components/Card.js";

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

// popupwithimage
const popupCard = new PopupWithImage(configCard.popupSelector);

// popupwithconfirmation: para confirmação de exclusão de card
const popupTrash = new PopupWithConfirmation(
  configTrash.boxFormSelector,
  (cardInstance) => {
    myApi
      // método da api para excluir o card do servidor
      .deleteCard(cardInstance._cardId)
      .then(() => {
        // exclui o card da página
        cardInstance.removeCard();
        // fecha o popup de confirmação
        popupTrash.close();
      })
      .catch((err) => {
        console.error(`Erro ao deletar o card: ${err}.`);
      })
      .finally(() => {
        popupTrash.renderLoading(false);
      });
  }
);

// variáveis para serem acessadas em várias funções
let currentUserId = null;
let sectionCardsInstance = null;

// carrega informações do meu usuário do servidor e meus cards iniciais (carregamento inicial)
myApi
  .getServerInfosAndCardsinPromiseAll()
  .then(([serverInfos, serverCards]) => {
    // atribui valor à variável para o id do usuário (logado)
    currentUserId = serverInfos._id;

    // renderiza a foto do usuário do servidor
    profilePhoto.style.backgroundImage = `url(${serverInfos.avatar})`;
    // renderiza as infos do usuário do servidor
    profileInfos.setUserInfo({
      name: serverInfos.name,
      about: serverInfos.about,
    });

    // section e card: renderiza cards iniciais
    sectionCardsInstance = new Section(
      {
        items: serverCards.reverse(), // para inverter e renderizar primeiro o do servidor, após os meus (addItem adiciona com prepend)
        renderer: (item) => {
          const cardElement = new Card({
            name: item.name,
            link: item.link,
            cardId: item._id,
            ownerId: item.owner,
            currentUserId: currentUserId, // ID do usuário logado declarado no escopo global para ser reutilizado
            handleImageClick: popupCard.open.bind(popupCard), // sugestão do ChatGPT
            handleLikeClick: (cardId, likeBtn) => {
              toggleLike(cardId, likeBtn, myApi);
            },
            handleDeleteClick: (cardInstance) => {
              popupTrash.open(cardInstance); // passa a instância do card
            },
          });
          const cardItem = cardElement.generateCard();
          sectionCardsInstance.addItem(cardItem);
        },
      },
      sectionCards
    );
    sectionCardsInstance.renderAll();
  })
  .catch((err) => {
    console.log(
      `Erro ao renderizar informações do usuário e/ou cartões iniciais do servidor: ${err}.`
    );
  });

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

// para abrir popup image dos cards inseridos pela página
sectionCards.addEventListener("click", (evt) => {
  popupCard.open(evt);
});

// popupforphoto e api: para editar a foto do perfil
const popupEditPhoto = new PopupForPhoto(
  configPhoto.boxFormSelector,
  (dataPhoto) => {
    myApi
      // envia a nova foto do perfil para o servidor
      .submitPhotoProfile(dataPhoto)
      .then((result) => {
        // atualiza a foto do perfil na página
        profilePhoto.style.backgroundImage = `url(${result.avatar})`;
        // fecha o popup foto
        popupEditPhoto.close();
      })
      .catch((err) => {
        console.log(`Erro ao atualizar a foto de perfil: ${err}.`);
      })
      .finally(() => {
        popupEditPhoto.renderLoading(false);
      });
  }
);

// popupwithform e api: envio de infos
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
        // fecha popup edt
        popupEdtProfile.close();
      })
      .catch((err) => {
        console.log(`Erro ao atualizar as informações de perfil: ${err}.`);
      })
      .finally(() => {
        popupEdtProfile.renderLoading(false);
      });
  }
);

// form add: para adicionar um novo card na página via popup
const popupAddCard = new PopupWithForm(
  configAdd.boxFormSelector,
  (dataFromPopupAdd) => {
    myApi
      // envia dados do popup para a API
      .submitNewCard(dataFromPopupAdd)
      // configura e adiciona um novo cartão na página
      .then((dataResultFromAPI) => {
        const newCardElement = new Card({
          name: dataResultFromAPI.name,
          link: dataResultFromAPI.link,
          cardId: dataResultFromAPI._id,
          ownerId: dataResultFromAPI.owner,
          currentUserId: currentUserId, // variável declarada e atribuída em myApi.getServerInfosAndCardsinPromiseAll()
          handleImageClick: popupCard.open.bind(popupCard), // sugestão do ChatGPT
          handleLikeClick: (cardId, likeBtn) =>
            toggleLike(cardId, likeBtn, myApi),
          handleDeleteClick: (cardInstance) => {
            popupTrash.open(cardInstance); // passa a instância do card
          },
        });
        // gera o card
        const newCardItem = newCardElement.generateCard();
        // adiciona o card na seção de cards
        sectionCardsInstance.addItem(newCardItem); // Vai para o topo com prepend
        // fecha popup add
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Erro ao adicionar o novo cartão na página: ${err}.`);
      })
      .finally(() => popupAddCard.renderLoading(false));
  }
);
