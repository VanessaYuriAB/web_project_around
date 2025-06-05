export default class UserInfo {
  //Pega um objeto com os seletores do nome do usuário (name) e do trabalho do usuário (about).
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  //Retorna um objeto com informação sobre o usuário. Método útil para exibir os dados do usuário no formulário aberto > Retorna os dados do perfil visíveis na página.
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  //Pega novos dados do usuário e adiciona na página > Atualiza os dados do perfil na página.
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
