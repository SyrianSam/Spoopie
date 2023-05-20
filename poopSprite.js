import Sprite from './sprite.js';

export default class PoopSprite {
  constructor(context, image, width, height, numberOfFrames, ticksPerFrame) {
    this.sprite = new Sprite(context, image, width, height, numberOfFrames, ticksPerFrame);
  }

  //poop-specific update logic
  update() {
    this.sprite.update();
  }

  //poop-specific render logic
  render(x, y) {
    this.sprite.render(x, y);
  }

  // Additional poop-specific methods or properties
}
