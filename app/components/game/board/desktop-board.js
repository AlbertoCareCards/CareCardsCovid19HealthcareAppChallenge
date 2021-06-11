import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';
import Board from './board';

/**
 * Game board for desktop screens.
 */
export default class DesktopBoard extends Board {
  dimensions = null;

  // Component Input Properties
  // --------------------------
  @arg pauseGame;
  @arg selectAnswer;
  @arg @tracked answers;
  @arg rewindLastPlayedCard;

  // Component Auxiliar Functions
  // ----------------------------
  hasOddAnswer() {
    return this.answers.length % 2 === 1;
  }

  // Component Computed Properties
  // -----------------------------
  get leftAnswers() {
    const halfAnswersLength = Math.floor(this.answers.length / 2);
    const halfAnswerLengthReminder = this.answers.length % 2;
    return this.answers.slice(
      halfAnswerLengthReminder,
      halfAnswersLength + halfAnswerLengthReminder);
  }

  get rightAnswers() {
    const halfAnswersLength = Math.floor(this.answers.length / 2);
    const halfAnswerLengthReminder = this.answers.length % 2;
    return this.answers.slice(
      halfAnswersLength + (halfAnswerLengthReminder),
      this.answers.length);
  }

  get oddAnswer() {
    return this.hasOddAnswer() ? this.answers[0] : null;
  }

  @action
  openPauseMenu() {
    this.pauseGame();
  }
}
