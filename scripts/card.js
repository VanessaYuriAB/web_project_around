class Card {
  constructor(text, imgLink, cardSelector) {
    this._text = text;
    this._imgLink = imgLink;
    this._cardSelector = cardSelector;
    this._element = null;
  }

  _getCloneFromTemplate() {
    const cardElement = document
      .querySelector("#template-cards")
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getCloneFromTemplate();
    this._setEventListeners();

    const imgCard = this._element.querySelector(".card__image");
    const nameCard = this._element.querySelector(".card__name");

    imgCard.src = this._imgLink;
    nameCard.textContent = this._text;
    imgCard.alt = `${this._text}`;

    return this._element;
  }

  _setEventListeners() {
    this._prepareCardLikeBtn();
    this._prepareCardTrashBtn();
  }

  _prepareCardLikeBtn() {
    const likeBtn = this._element.querySelector(".card__like-btn");

    likeBtn.classList.remove("card__like-btn_active");

    likeBtn.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-btn_active");
    });
  }

  _prepareCardTrashBtn() {
    const trashBtn = this._element.querySelector(".card__trash-btn");

    trashBtn.addEventListener("click", (evt) => {
      const card = trashBtn.closest(".card-elements");
      card.remove();
    });
  }
}

const templateCards = [
  {
    text: "Japão, Monte Fuji",
    imgLink: "./images/monte-fuji_japão_popup.jpg",
    cardSelector: "#popup-jp",
  },
  {
    text: "Portugal, Porto",
    imgLink: "./images/porto_portugal__popup.jpg",
    cardSelector: "#popup-pt",
  },
  {
    text: "Itália, Matera",
    imgLink: "./images/matera_itália_popup.jpg",
    cardSelector: "#popup-it",
  },
  {
    text: "Filipinas, El Nido",
    imgLink: "./images/el-nido_filipinas_popup.jpg",
    cardSelector: "#popup-fl",
  },
  {
    text: "Noruega, Lofoten",
    imgLink: "./images/lofoten_noruega_popup.jpg",
    cardSelector: "#popup-nr",
  },
  {
    text: "Suécia, Kiruna",
    imgLink: "./images/kiruna_suécia_popup.jpg",
    cardSelector: "#popup-sc",
  },
];

templateCards.forEach((dataCard) => {
  const sectionCards = document.querySelector(".elements__cards");

  const cardItem = new Card(
    dataCard.text,
    dataCard.imgLink,
    dataCard.cardSelector
  );

  cardElement = cardItem.generateCard();

  sectionCards.append(cardElement);
});
