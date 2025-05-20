export default class UserInfo {
  //Pega um objeto com os seletores de dois elementos no construtor: um contendo o nome do usuário e o outro contendo o trabalho do usuário.
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  //Retorna um objeto com informação sobre o usuário. Método útil para exibir os dados do usuário no formulário aberto.
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  //Pega novos dados do usuário e adiciona na página.
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
