import { ASSETS, PALETTE } from 'constants';
import fp from 'lodash/fp';

export default class Timer extends Phaser.Text {
  constructor(game, x, y, seconds) {
    super(game, x, y, seconds, { font: '15px Pixeled', fill: PALETTE.WHITE })
    this.total = seconds;
    this.anchor.setTo(0.5, 0.5);
    this.complete = false;

    this.counter = this.game.time.create(false);

    const ms = this.total * 1000;
    this.counter.add(ms, () => this.complete = true);
    fp.times((index) => {
      const time = ms - (index + 1) * 1000;

      this.counter.add(time, () => this.game.sound.play(ASSETS.SFX_COUNTDOWN));
    })(3);

    this.counter.start();
  }

  update() {
    const { state } = this.game;
    const level = state.states[state.current];

    const displayText = (this.total - this.counter.seconds).toFixed(1);
    // I think this is bad for performance.
    this.setText(displayText);

    if (this.complete) {
      level.endGame('You ran out of time');
    }
  }
}
