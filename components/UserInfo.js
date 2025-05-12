//responsável por renderizar a informação sobre o usuário na página.
class UserInfo {
  //objeto: um contendo o nome do usuário e o outro contendo o trabalho do usuário.
  constructor({ name, job }) {
    //Pegar um objeto com os seletores de dois elementos no construtor.
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  //retorna um objeto com informação sobre o usuário. Esse método será útil para casos em que é necessário exibir os dados do usuário no formulário aberto.
  getUserInfo() {
    // para o popup edt: preenche inputs com infos do perfil
    const popupInputs = Array.from(
      popupBox.querySelectorAll(config.inputSelector)
    );

    if (extraFunctions && extraFunctions.fillEdtPopupInputs) {
      extraFunctions.fillEdtPopupInputs(popupInputs);
    }
    // VERIFICAR FUNÇÕES, POIS ESTÁ DE ACORDO COM CÓDIGO ANTIGO
  }

  //pega novos dados do usuário e adiciona na página.
  setUserInfo() {
    // SOMENTE INFOS DO PERFIL?
  }
}
