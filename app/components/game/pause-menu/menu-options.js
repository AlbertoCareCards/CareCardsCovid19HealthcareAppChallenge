import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class MenuOptions extends Component {
  // Component Input Properties
  // --------------------------
  @arg changeSection;
  @arg restartGame;
  @arg cancelGame;

  @action
  selectSection(index) {
    this.changeSection(index);
  }

  @action
  resetGame() {
    this.restartGame();
  }

  @action
  quitGame() {
    this.cancelGame();
  }
}
