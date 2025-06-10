function setupLikeButton(likeButton, cardId, api) {
  likeButton.classList.remove("card__like-btn_active");

  likeButton.addEventListener("click", (evt) => {
    const isLiked = evt.target.classList.contains("card__like-btn_active");

    const request = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

    request
      .then(() => {
        evt.target.classList.toggle("card__like-btn_active");
      })
      .catch((err) => {
        console.log(`Erro ao alternar o like do cartão: ${err}.`);
      });
  });
}

export { setupLikeButton };
