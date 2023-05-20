import Sprite from './sprite.js';

export default class PoopSprite {
  constructor(context, image, width, height, numberOfFrames, ticksPerFrame) {
    this.sprite = new Sprite(context, image, width, height, numberOfFrames, ticksPerFrame);
  }

  update() {
    this.sprite.update();
    // Additional poop-specific update logic
  }

  render(x, y) {
    this.sprite.render(x, y);
    // Additional poop-specific render logic
  }

  // Additional poop-specific methods or properties
  // ...
}
