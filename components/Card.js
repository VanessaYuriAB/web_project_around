export default class Card {
  constructor(text, imgLink, cardSelector, handleCardClick) {
    this._text = text;
    this._imgLink = imgLink;
    this._cardSelector = cardSelector;
    this._element = null;

    this._handleCardClick = handleCardClick;

    // definição dos handlers para listeners
    this._handleLikeClick = (evt) => {
      evt.target.classList.toggle("card__like-btn_active");
    };

    this._handleTrashClick = () => {
      this._removeCard();
    };
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

    this._imgCard = this._element.querySelector(".card__image");
    this._nameCard = this._element.querySelector(".card__name");

    this._setEventListeners();

    this._imgCard.src = this._imgLink;
    this._nameCard.textContent = this._text;
    this._imgCard.alt = `${this._text}`;

    return this._element;
  }

  _setEventListeners() {
    this._prepareCardLikeBtn();
    this._prepareCardTrashBtn();
    this._prepareCardImageClick();
  }

  _prepareCardImageClick() {
    // adiciona o listener no clique da imagem para abrir o popup
    this._imgCard.addEventListener("click", this._handleCardClick);
  }

  _prepareCardLikeBtn() {
    this._likeBtn = this._element.querySelector(".card__like-btn");

    this._likeBtn.classList.remove("card__like-btn_active");

    this._likeBtn.addEventListener("click", this._handleLikeClick);
  }

  _prepareCardTrashBtn() {
    this._trashBtn = this._element.querySelector(".card__trash-btn");

    this._trashBtn.addEventListener("click", this._handleTrashClick);
  }

  _removeCard() {
    // remove listeners
    this._imgCard.removeEventListener("click", this._handleCardClick);
    this._likeBtn.removeEventListener("click", this._handleLikeClick);
    this._trashBtn.removeEventListener("click", this._handleTrashClick);

    // deleta card
    this._element.remove();
  }
}
