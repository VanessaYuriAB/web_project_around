export default class Card {
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
