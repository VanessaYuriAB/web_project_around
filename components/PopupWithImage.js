import Popup from "./Popup.js";
import { sectionCards } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imagePopup = this._element.querySelector(this._config.imageSelector);
    this._captionPopup = this._element.querySelector(
      this._config.captionSelector
    );
  }

  //Alterar o método pai open(): adicionar uma imagem ao pop-up e o atributo src da imagem correspondente junto com uma legenda para a imagem.
  open(evt) {
    const imageCard = evt.target.closest(".card__image");

    if (!imageCard) return;

    const titleCard = imageCard.closest(".card").querySelector(".card__name");

    this._imagePopup.src = imageCard.src;
    this._captionPopup.textContent = titleCard.textContent;
    this._imagePopup.alt = this._captionPopup.textContent;

    sectionCards.prepend(this._element);

    // desativa o scroll do fundo
    document.body.style.overflow = "hidden";

    // abre popup
    super.open();
  }

  close() {
    super.close();

    this._element.remove();

    // Reativa o scroll do fundo
    document.body.style.overflow = ""; // Reseta para o valor padrão
  }
}

//Transformação da classe Card
//Conecte a classe Card ao pop-up. Faça Card levar a função handleCardClick() para dentro do construtor. Quando o usuário clicar no cartão, esta função abrirá o pop-up com uma imagem.
