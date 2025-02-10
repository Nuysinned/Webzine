class Screen {
  static get width() {
    return window.innerWidth;
  }
  static get height() {
    return window.innerHeight;
  }
  static get min() {
    return Math.min(Screen.width, Screen.height);
  }
}
