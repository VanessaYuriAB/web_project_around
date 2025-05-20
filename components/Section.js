export default class Section {
  //Objeto com duas propriedades (items e renderer) como primeiro parâmetro do construtor. A propriedade items serve como um vetor de dados, para adicionar em uma página ao inicializar a classe. A propriedade renderer é uma função responsável por criar e renderizar dados em uma página. O segundo parâmetro deve ser um seletor de classe CSS onde você adicionará os elementos do cartão.
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Renderiza todos os elementos na página. A função renderer() vai renderizar cada elemento na página.
  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //Pega um elemento DOM e adiciona ao contêiner.
  addItem(element) {
    this._container.append(element);
  }
}
