export default class Section {
  // O primeiro parâmetro do construtor é um objeto com duas propriedades:
  // - items: vetor de dados a serem adicionados à página ao inicializar a classe.
  // - renderer: função responsável por criar e renderizar cada item; ela é passada de fora da classe e define o que fazer com cada item do array items.
  // O segundo parâmetro é um seletor CSS do contêiner onde os elementos serão adicionados.
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerElement;
  }

  // Renderiza todos os elementos na página.
  // Executa a função passada no parâmetro renderer para cada item do array items.
  renderAll() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adiciona um elemento DOM ao contêiner.
  addItem(element) {
    this._container.prepend(element); // Garante que novos cards aparecem no topo
  }
}
