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

// objeto para os campos do perfil (nome e sobre)
const profileSelectors = {
  name: ".infos__name",
  job: ".infos__about",
};

// objetos de configuração edt e add
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

// constantes para validador
const edtFormElement = document.querySelector(configEdt.formSelector);
const addFormElement = document.querySelector(configAdd.formSelector);

// constantes para campos do popup form edt
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="about"]');

// constantes para campos do popup form add
const titleInput = document.querySelector('input[name="place"]');
const imageInput = document.querySelector('input[name="link"]');

const templateNewCard = document.querySelector("#template-model-card").content;

// objeto para handlers dos listeners de fechamento dos popups
const popupHandlers = { clickOut: null, keyEsc: null, closeBtn: null };

// constantes para botões de popups form
const edtBtnElement = document.querySelector(".infos__edit-btn");
const addBtnElement = document.querySelector(".profile__add-btn");

export {
  templateCards,
  sectionCards,
  configEdt,
  configAdd,
  popupHandlers,
  profileSelectors,
  edtFormElement,
  addFormElement,
  edtBtnElement,
  addBtnElement,
  nameInput,
  jobInput,
  titleInput,
  imageInput,
  templateNewCard,
};
