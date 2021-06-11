import Board from './board';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';
import phoneDirectionalAnswers from '../../../decorators/phoneDirectionalAnswers';

/**
 * Desktop Board answer
 */
@phoneDirectionalAnswers
export default class PhoneBoard extends Board {
  @inject eventBusManager;

  // Component Input Properties
  // --------------------------
  @arg @tracked answers;
  @arg @tracked cards;
  @arg selectAnswer;
  @arg pauseGame;
  @arg discardTopDeckCard;
  @arg rewindLastPlayedCard;

  // Component Hooks
  // ---------------
  constructor() {
    super(...arguments);
    this.eventBusManager.subscribe('dragAnswer', this.detectAnswerSelection);
  }

  /**
   * Removes event bus manager listener to avoid signal overlapping
   * with desktop board.
   */
  willDestroy() {
    super.willDestroy();
    this.eventBusManager.unsubscribe('dragAnswer', this.detectAnswerSelection);
  }

  // Component Auxiliar Functions
  // ----------------------------
  /**
   * Given an offset (drag distance from the point the drag started) determines
   * if the drag is more to the left or to the right, and selects an answer according
   * to it.
   * @param xOffset
   * @return {*}
   */
  selectedHorizontalAnswer(xOffset) {
    return xOffset > 0 ? this.rightAnswer : this.leftAnswer;
  }

  /**
   * Given an offset (drag distance from the point the drag started) determines
   * if the drag is more to the top or to the bottom, and selects an answer according
   * to it.
   * @param yOffset
   * @return {null}
   */
  selectedVerticalAnswer(yOffset) {
    return yOffset > 0 ? this.bottomAnswer : this.topAnswer;
  }

  /**
   * Given an offset (drag distance from the point the drag started) determines in which
   * direction the drag is stronger (horizontal/vertical) and selects an answer according
   * to it.
   * @param xOffset
   * @param yOffset
   * @return {*}
   */
  selectedAnswer(xOffset, yOffset) {
    if(this.answers.length <= 3) return this.selectedHorizontalAnswer(xOffset);

    return Math.abs(xOffset) > Math.abs(yOffset) ?
      this.selectedHorizontalAnswer(xOffset) : this.selectedVerticalAnswer(yOffset);
  }

  // Component Computed Properties
  // -----------------------------
  get topDeckCard() {
    return this.cards.find((c) => c.position === 0);
  }

  /**
   * Is there any card to rewind?
   * @return {*|number|bigint}
   */
  get canRewind() {
    return this.cards.find((c) => c.position === -1);
  }

  /**
   * This function is called on every drag event. The function takes the
   * drag coordinates and compares them with the center of the screen. Depending
   * on the coordinates a specific answer is selected.
   * @param dragCoordinates
   */
  @action
  detectAnswerSelection(dragCoordinates) {
    const selectedAnswer = this.selectedAnswer(dragCoordinates.xOffset, dragCoordinates.yOffset);
    this.selectAnswer(selectedAnswer);
  }

  @action
  rewind() {
    if(this.canRewind) this.rewindLastPlayedCard();
  }

  @action
  playOddAnswer(answer) {
    this.discardTopDeckCard(answer);
  }

  @action
  openPauseMenu() {
    this.pauseGame();
  }
}
