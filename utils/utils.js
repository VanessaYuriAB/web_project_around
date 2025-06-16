export default function toggleLike(cardId, likeBtn, apiInstance) {
  const isLiked = likeBtn.classList.contains("card__like-btn_active");

  likeBtn.disabled = true; // desativa botão durante requisição

  const request = isLiked
    ? apiInstance.unlikeCard(cardId)
    : apiInstance.likeCard(cardId);

  request
    .then((updatedCardData) => {
      // atualiza a classe do botão
      likeBtn.classList.toggle("card__like-btn_active");
    })
    .catch((err) => console.log(`Erro ao alternar o like do cartão: ${err}.`))
    .finally(() => {
      likeBtn.disabled = false; // reativa botão após resposta
    });
}
