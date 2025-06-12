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

  // carrega as informações de usuário do servidor
  getServerUserInfos() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers, // a solicitação GET é enviada com content-type, mas não interfere no resultado
    }).then((res) => this._checkResponse(res));
  }

  // captura cards iniciais do usuário do servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // envia meus cards iniciais ao usuário do servidor
  submitMyNewCards() {
    const promises = myCards.map((card) => {
      return fetch(`${this._baseUrl}/cards/`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: card.place, // o nome do input e em myCards é place
          link: card.link,
        }),
      }).then((res) => this._checkResponse(res));
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
    }).then((res) => this._checkResponse(res));
  }

  // atualiza foto do perfil
  submitPhotoProfile(dataPhoto) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataPhoto,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // adiciona um novo cartão no usuário do servidor
  submitNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.place, // o name do input é place
        link: dataCard.link,
      }),
    }).then((res) => this._checkResponse(res));
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
    }).then((res) => this._checkResponse(res));
  }

  // captura cartões somente após carregar as informações do usuário no servidor
  getServerInfosAndCardsinPromiseAll() {
    return Promise.all([this.getServerUserInfos(), this.getInitialCards()]);
  }
}

/*
// Pré-requisitos.
// Neste projeto, você deverá obter um token pessoal através deste link:

// Token abaixo é o token que foi exibido na página do navegador ao clicar no link na plataforma:

fetch("https://around-api.pt-br.tripleten-services.com/v1/users/create", {
  headers: {
    authorization: "3c7ad9a7-200c-4d07-b160-7978cd40d815",
  }
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

// Token abaixo foi enviado como resposta à solicitação acima:

{user: {…}, token: 'f5b337a1-89dd-4f09-826f-0ed62662122f'}
  token: "f5b337a1-89dd-4f09-826f-0ed62662122f"
  user:
    about: "Explorador"
    avatar: "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg"
    name: "Jacques Cousteau"
    _id: "85bb5ae4b8d2da87388b8175"
    [[Prototype]]: Object
  [[Prototype]]: Object
*/
