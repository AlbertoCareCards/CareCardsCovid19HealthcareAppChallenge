import Board from '../board';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';
import { arg } from 'ember-arg-types';
import phoneDirectionalAnswers from '../../../../decorators/phoneDirectionalAnswers';

/**
 * This component is set up on phone screens over the selected
 * cards to keep information about the selected answers and the
 * current selected answer.
 */
@phoneDirectionalAnswers
export default class Answers extends Board {
  @inject animationManager;
  @inject eventBusManager;

  answersWrapper = null;
  showingAnswers = true;

  @arg answers;
  @arg selectedAnswer;
  @arg @tracked playedCards;

  /**
   * Given a direction (left, right, top, bottom) returns the number
   * of "direction" answers selected
   * @param direction
   * @return {*}
   */
  answersCounter(direction) {
    return this.playedCards
      .filter((c) => c.value && c.value.answer === this[`${direction}Answer`].answer)
      .length;
  }

  get leftAnswerCounter() {
    return this.answersCounter('left');
  }

  get rightAnswerCounter() {
    return this.answersCounter('right');
  }

  get topAnswerCounter() {
    return this.answersCounter('top');
  }

  get bottomAnswerCounter() {
    return this.answersCounter('bottom');
  }

  @action
  toggleAnswer(domAnswer) {
    if(this.showingAnswers)
      return this.animationManager.hidePhoneAnswer(this[domAnswer]);
    return this.animationManager.showPhoneAnswer(this[domAnswer]);
  }

  /**
   * Switches display of answers.
   */
  @action
  toggleAnswers() {
    const doms = ['leftAnswerDom', 'rightAnswerDom', 'topAnswerDom', 'bottomAnswerDom'];
    doms.forEach(async (d) => await this.toggleAnswer(d));
    set(this, 'showingAnswers', !this.showingAnswers);
  }

  /**
   * After rendering component set a timeout to hide answers
   * after certain time.
   */
  @action
  async revealAnswersAndSetTimeout(element) {
    await this.animationManager.revealAnswers(element);
    setTimeout(() => {
      if(!this.isDestroyed && this.showingAnswers) this.toggleAnswers();
    }, 6000);
  }
}
