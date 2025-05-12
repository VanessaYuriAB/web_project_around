//classe filha de Popup
class PopupWithImage extends Popup {
  constructor(parameters) {}

  //alterar o método pai open().
  open() {
    //adicionar uma imagem ao pop-up e o atributo src da imagem correspondente junto com uma legenda para a imagem.
    const imgCard = evt.target.closest(".card__image");

    if (!imgCard) return;

    currentPopupCard = templatePopupImg.cloneNode(true).firstElementChild;

    const imgPopup = currentPopupCard.querySelector(".popup-card__image");
    const titlePopup = currentPopupCard.querySelector(".popup-card__title");
    const titleCard = imgCard.closest(".card").querySelector(".card__name");

    imgPopup.src = imgCard.src;
    titlePopup.textContent = titleCard.textContent;
    imgPopup.alt = titlePopup.textContent;

    sectionCards.prepend(currentPopupCard);
    // VERIFICAR VARIÁVEIS E SELETORES

    // Desativa o scroll do fundo
    document.body.style.overflow = "hidden";
    // VERIFICAR SOBRE FUNÇÃO
  }
}

//Transformação da classe Card
//Conecte a classe Card ao pop-up. Faça Card levar a função handleCardClick() para dentro do construtor. Quando o usuário clicar no cartão, esta função abrirá o pop-up com uma imagem.
