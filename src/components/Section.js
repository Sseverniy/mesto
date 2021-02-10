export class Section {
  constructor({
    items, 
    renderer}, 
    containerSelector) {
      this._renderedItems = items;//сюда передаем массив карточек
      this._container = document.querySelector(containerSelector); //сюда передаем селектор-класс, куда добавляем все карточки
      this._renderer = renderer;
  }
  
  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {this._renderer(item);});
  }
};