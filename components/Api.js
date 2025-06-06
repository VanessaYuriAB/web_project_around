export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // captura card inicial do servidor
  getInitialCards() {
    return fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
      headers: {
        authorization: "3c7ad9a7-200c-4d07-b160-7978cd40d815",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // outros métodos para trabalhar com a API
}
