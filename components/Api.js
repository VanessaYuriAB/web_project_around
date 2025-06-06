export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // captura card inicial do servidor
  getInitialCard() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // método (privado) para tratamento das respostas
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}.`);
    // se o servidor retornar um erro, rejeite a promessa
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
}
