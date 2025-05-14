//Responsável por renderizar a informação sobre o usuário na página.
class UserInfo {
  //Pegar um objeto com os seletores de dois elementos no construtor: um contendo o nome do usuário e o outro contendo o trabalho do usuário.
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  //Retorna um objeto com informação sobre o usuário. Esse método será útil para casos em que é necessário exibir os dados do usuário no formulário aberto.
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  //Pega novos dados do usuário e adiciona na página.
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
