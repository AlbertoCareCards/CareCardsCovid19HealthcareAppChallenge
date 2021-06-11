import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class PauseMenu extends Component {
  carousel = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg modal;
  @arg quitGame;
  @arg resetGame;

  @action
  changeSection(sectionIndex) {
    this.carousel.goToSlide(sectionIndex);
    set(this, 'section', sectionIndex);
  }

  @action
  resumeGame() {
    this.modal.hide();
  }

  @action
  restartGame() {
    this.resetGame();
    this.resumeGame();
  }

  @action
  async cancelGame() {
    this.modal.hide();
    this.quitGame();
  }
}
