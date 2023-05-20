import Sprite from './sprite.js';

export default class CoinSprite {
  constructor(context, image, width, height, numberOfFrames, ticksPerFrame) {
    this.sprite = new Sprite(context, image, width, height, numberOfFrames, ticksPerFrame);
  }

  update() {
    this.sprite.update();
    // Additional coin-specific update logic
  }

  render(x, y) {
    this.sprite.render(x, y);
    // Additional coin-specific render logic
  }

  // Additional coin-specific methods or properties
  // ...
}
