import {
  templateNewCard,
  validExtensions,
  knownImageDomains,
} from "../utils/constants.js";

export default class Card {
  constructor({
    name,
    link,
    cardId,
    ownerId,
    isLiked,
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

    this._isLiked = isLiked;

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

    this._trashBtn = this._element.querySelector(".card__trash-btn");

    this._likeBtn = this._element.querySelector(".card__like-btn");

    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-btn_active");
    }

    // gera id único para o card (usando o _id que vem da API)
    this._element.id = `card-${this._cardId}`;

    // configura href do botão curtir para o próprio id do card
    this._likeBtn.href = `#card-${this._cardId}`;

    // configura as informações do card
    this._imgCard.src = this._link;
    this._imgCard.alt = `${this._name}`;
    this._nameCard.textContent = this._name;

    this._setEventListeners();
    this._setTrashBtnForNoImageBackground();

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

  // verifica se a extensão do formato do link da imagem inserida é válida com extensões aceitas para imagens e domínios conhecidos de imagens
  _isValidImageFormat(url) {
    const urlLower = url.toLowerCase();

    const hasValidExtension = validExtensions.some((ext) =>
      urlLower.endsWith(ext)
    );

    const isFromKnownDomain = knownImageDomains.some((domain) =>
      url.includes(domain)
    );

    return hasValidExtension || isFromKnownDomain;
  }

  // para configurar o ícone de lixeira em cards sem imagem
  _setTrashBtnForNoImageBackground() {
    if (!this._isValidImageFormat(this._link)) {
      this._trashBtn.style.filter = "drop-shadow(0 0 2px rgba(0,0,0,0.5))";
    }
  }

  // getter para id do card
  get cardId() {
    return this._cardId;
  }
}
