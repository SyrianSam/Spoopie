import Sprite from './sprite.js';

export default class PlayerSprite {
  constructor(context, image, imageRun, imageIdle, width, height, numberOfFrames, ticksPerFrame) {
    this.sprite = new Sprite(context, image, width, height, numberOfFrames, ticksPerFrame);
    this.imageRun = imageRun;
    this.imageIdle = imageIdle;
  }

  update() {
    this.sprite.update();
    // Additional player-specific update logic
  }

  render(x, y) {
    this.sprite.render(x, y);
    // Additional player-specific render logic
  }

  // Additional player-specific methods or properties
  // ...
}
