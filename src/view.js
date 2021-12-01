export default class View {
  constructor() {
    this.inputUrl = document.querySelector('#url-input');
    this.form = this.inputUrl.closest('form');
    this.addButton = this.form.querySelector('button');
  }

  clearInput() {
    this.inputUrl.value = '';
  }

  showInvalidInput(force = true) {
    this.inputUrl.classList.toggle('is-invalid', force);
  }
}
