import { ASSETS, COLLISION_GROUPS } from 'constants';
import { getCollisionGroup } from 'utils';

import Bullet from 'objects/bullet';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.PLAYER, 1);

    game.physics.p2.enable(this, true);

    this.body.setRectangle(20);
    this.body.static = true;
    game.debug.body(this);

    this.fired = false;

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.bullet = new Bullet(game, x + 20 , y);
    game.add.existing(this.bullet);

     // Collision Group
    const bulletGroup = getCollisionGroup(game, COLLISION_GROUPS.BULLET);
    const playerGroup = getCollisionGroup(game, COLLISION_GROUPS.PLAYER);

    this.body.setCollisionGroup(playerGroup);
    this.body.collides(bulletGroup);
  }

  update() {
    if (this.spaceKey.isDown && !this.fired) {
      this.fired = true;
      this.fireBullet();
    }
  }

  fireBullet() {
    this.bullet.body.velocity.x = 500;
    // this.bullet.body.velocity.y = 200;
  }
}


