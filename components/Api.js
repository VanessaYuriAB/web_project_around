import { myCards } from "../utils/constants.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // método (privado) para tratamento das respostas dos métodos da classe
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}.`);
    // se o servidor retornar um erro, rejeite a promessa
  }

  // carrega as informações do usuário do servidor
  getServerUserInfos() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers, // a solicitação GET é enviada com content-type, mas não interfere no resultado
    }).then(this._checkResponse);
  }

  // captura cards iniciais de usuários do servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // envia meus cards iniciais ao meu usuário do servidor
  submitMyNewCards() {
    const promises = myCards.map((card) => {
      return fetch(`${this._baseUrl}/cards/`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: card.title,
          link: card.imgLink,
        }),
      }).then(this._checkResponse);
    });

    return Promise.all(promises); // retorna uma Promise que só resolve quando todos forem enviados
  }

  // atualiza infos do perfil
  submitInfosProfile(dataProfile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataProfile.name,
        about: dataProfile.about,
      }),
    }).then(this._checkResponse);
  }

  // atualiza foto do perfil
  submitPhotoprofile(dataPhoto) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataPhoto,
      }),
    }).then(this._checkResponse);
  }

  // adiciona um novo cartão no servidor
  submitNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.place, // o name do input é place
        link: dataCard.link,
      }),
    }).then(this._checkResponse);
  }

  // curte um cartão
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // descurte um cartão
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // deleta um cartão do servidor
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
