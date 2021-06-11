import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';
import { arg } from 'ember-arg-types';

/**
 * Question displayer for phone board
 */
export default class Question extends Component {
  @inject intl;
  @inject animationManager;

  backSide = false;
  backQuestion = false;
  frontQuestion = false;

  @arg @tracked topDeckCard;

  // Component Hooks
  // ---------------
  constructor() {
    super(...arguments);
    set(this, 'frontQuestion', this.topDeckCard.question)
  }

  /**
   * When the top deck card changes then we load the next question
   * in the DOM and run the flip animation to show it.
   * @param element
   * @return {Promise<void>}
   */
  @action
  async flipQuestion(element) {
    const nextQuestion = this.topDeckCard ? this.topDeckCard.question : this.intl.t('board.questions-done');

    set(this, this.backSide ? 'frontQuestion' : 'backQuestion', nextQuestion);
    await this.animationManager.flipPhoneQuestion(element);
    set(this, 'backSide', !this.backSide);
  }
}
