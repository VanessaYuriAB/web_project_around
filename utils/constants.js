// array para cards iniciais
const templateCards = [
  {
    text: "Japão, Monte Fuji",
    imgLink: "../images/monte-fuji_japão_popup.jpg",
    cardSelector: "#popup-jp",
  },
  {
    text: "Portugal, Porto",
    imgLink: "../images/porto_portugal__popup.jpg",
    cardSelector: "#popup-pt",
  },
  {
    text: "Itália, Matera",
    imgLink: "../images/matera_itália_popup.jpg",
    cardSelector: "#popup-it",
  },
  {
    text: "Filipinas, El Nido",
    imgLink: "../images/el-nido_filipinas_popup.jpg",
    cardSelector: "#popup-fl",
  },
  {
    text: "Noruega, Lofoten",
    imgLink: "../images/lofoten_noruega_popup.jpg",
    cardSelector: "#popup-nr",
  },
  {
    text: "Suécia, Kiruna",
    imgLink: "../images/kiruna_suécia_popup.jpg",
    cardSelector: "#popup-sc",
  },
];

// constante para seção de cards
const sectionCards = document.querySelector(".elements__cards");

// constante para o elemento de foto do perfil
const profilePhoto = document.querySelector(".profile__photo");

// objetos de configuração para formulários edt, add, trash e photo
const configEdt = {
  boxFormSelector: ".popup-edt",
  formSelector: ".popup-edt__container",
  inputSelector: ".popup-edt__input-form",
  submitButtonSelector: ".popup-edt__btn-form",
  closeButtonSelector: ".popup-edt__icon-close-btn",
  closedPopupClass: "popup-edt_closed",
  inactiveButtonClass: "popup-edt__btn-form_disabled",
  inputErrorClass: "popup-edt__input-error",
};

const configAdd = {
  boxFormSelector: ".popup-add",
  formSelector: ".popup-add__container",
  inputSelector: ".popup-add__input-form",
  submitButtonSelector: ".popup-add__btn-form",
  closeButtonSelector: ".popup-add__icon-close-btn",
  closedPopupClass: "popup-add_closed",
  inactiveButtonClass: "popup-add__btn-form_disabled",
  inputErrorClass: "popup-add__input-error",
};

const configTrash = {
  boxFormSelector: ".popup-trash",
  formSelector: ".popup-trash__container",
  submitButtonSelector: ".popup-trash__btn-form",
  closeButtonSelector: ".popup-trash__icon-close-btn",
  closedPopupClass: "popup-trash_closed",
};

const configPhoto = {
  boxFormSelector: ".popup-photo",
  formSelector: ".popup-photo__container",
  inputSelector: ".popup-photo__input-form",
  submitButtonSelector: ".popup-photo__btn-form",
  closeButtonSelector: ".popup-photo__icon-close-btn",
  closedPopupClass: "popup-photo_closed",
  inactiveButtonClass: "popup-photo__btn-form_disabled",
  inputErrorClass: "popup-photo__input-error",
};

// constantes para validador
const edtFormElement = document.querySelector(configEdt.formSelector);
const addFormElement = document.querySelector(configAdd.formSelector);
const photoFormElement = document.querySelector(configPhoto.formSelector);

// constantes para campos do popup form edt
const nameInput = document.querySelector('input[name="name"]');
const aboutInput = document.querySelector('input[name="about"]');

// constante para campos do popup form add
const templateNewCard = document.querySelector("#template-model-card").content;

// constante e obj para popup image
const templatePopupImg = document.querySelector("#template-popup-img").content;

const configCard = {
  popupSelector: ".popup-card",
  closeButtonSelector: ".popup-card__icon-close-btn",
  imageSelector: ".popup-card__image",
  captionSelector: ".popup-card__title",
  formSelector: ".popup-card__image", // formSelector para acompanhar construtor da classe pai (Popup) > para listener de fechamento > refere-se à área da imagem do popup.
};

// objeto para handlers dos listeners de fechamento dos popups
const popupHandlers = { clickOut: null, keyEsc: null, closeBtn: null };

// constantes para botões de abertura dos popups form
const edtBtnElement = document.querySelector(".infos__edit-btn");
const addBtnElement = document.querySelector(".profile__add-btn");
const photoBtnElement = document.querySelector(".profile__photo_overlay");

export {
  templateCards,
  sectionCards,
  configEdt,
  configAdd,
  popupHandlers,
  edtFormElement,
  addFormElement,
  edtBtnElement,
  addBtnElement,
  nameInput,
  aboutInput,
  templateNewCard,
  templatePopupImg,
  configCard,
  configTrash,
  configPhoto,
  photoFormElement,
  photoBtnElement,
  profilePhoto,
};
