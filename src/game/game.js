require('phaser');

const distance = 300;
const speed = 6;
const stars = [];

const max = 400;
const x = [];
const y = [];
const z = [];

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('logo', 'assets/logo.png');
  this.load.image('star_small', 'assets/star.png');
}

function create() {
  for (let i = 0; i < max; i++) {
    stars.push(this.add.sprite(config.width / 2, config.height / 2, 'star_small'));
    x[i] = Math.floor(Math.random() * 800) - 400;
    y[i] = Math.floor(Math.random() * 600) - 300;
    z[i] = Math.floor(Math.random() * 1700) - 100;
  }
  this.add.sprite(config.width / 2, config.height / 2, 'logo');
}

function update() {
  for (let i = 0; i < max; i++) {
    const perspective = distance / (distance - z[i]);
    const x_coord = (config.width / 2) + x[i] * perspective;
    const y_coord = (config.height / 2) + y[i] * perspective;

    z[i] += speed;

    if (z[i] > 300) {
      z[i] -= 600;
    }

    stars[i].setPosition(x_coord, y_coord);
  }
}