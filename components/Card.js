import { templateNewCard } from "../utils/constants.js";

export default class Card {
  constructor({
    name,
    link,
    cardId,
    ownerId,
    currentUserId,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
  }) {
    this._name = name;
    this._link = link;

    this._cardId = cardId;
    this._ownerId = ownerId;
    this._currentUserId = currentUserId; // ID do usuário logado

    // definido fora da classe, na instanciação
    this._handleImageClick = handleImageClick; // abre popup image
    this._handleLikeClick = handleLikeClick; // configura curtida
    this._handleDeleteClick = handleDeleteClick; // configura delete do card

    this._element = null;

    // armazena referências para remover listeners ao deletar o card
    this._boundHandleLike = null;
    this._boundHandleDelete = null;
  }

  // cria o card a partir do clone do template
  _getCloneFromTemplate() {
    return templateNewCard.cloneNode(true).querySelector(".card-model");
  }

  // gera o card com as informações e eventos do mesmo
  generateCard() {
    this._element = this._getCloneFromTemplate();

    this._imgCard = this._element.querySelector(".card__image");
    this._nameCard = this._element.querySelector(".card__name");

    this._likeBtn = this._element.querySelector(".card__like-btn");
    this._trashBtn = this._element.querySelector(".card__trash-btn");

    this._imgCard.src = this._link;
    this._imgCard.alt = `${this._name}`;
    this._nameCard.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  // adiciona listeners
  _setEventListeners() {
    this._prepareCardImageClick();
    this._prepareCardLikeClick();
    this._prepareCardDeleteClick();
  }

  // configura listener para abrir popup da imagem
  _prepareCardImageClick() {
    this._imgCard.addEventListener("click", this._handleImageClick);
  }

  // configura listener de curtida
  _prepareCardLikeClick() {
    this._likeBtn.classList.remove("card__like-btn_active");

    // armazena a função para poder remover listener
    this._boundHandleLike = () => {
      this._handleLikeClick(this._cardId, this._likeBtn);
    };

    this._likeBtn.addEventListener("click", this._boundHandleLike);
  }

  // verifica se o cartão é o do usuário logado no servidor e não é o cartão que já estava na API
  _isDeletableCard() {
    return (
      this._ownerId === this._currentUserId &&
      this._cardId !== "683ef584285e50001a4cd806"
    );
  }

  // configura listener de lixeira
  _prepareCardDeleteClick() {
    if (this._isDeletableCard()) {
      // armazena a função para poder remover listener
      this._boundHandleDelete = () => {
        this._handleDeleteClick(this);
      };

      this._trashBtn.addEventListener("click", this._boundHandleDelete);
    } else {
      this._trashBtn.style.display = "none";
    }
  }

  // remove listeners e deleta o card em questão
  removeCard() {
    this._imgCard.removeEventListener("click", this._handleImageClick);

    this._likeBtn.removeEventListener("click", this._boundHandleLike);

    this._trashBtn.removeEventListener("click", this._boundHandleDelete);

    this._element.remove();
    this._element = null;
  }
}
