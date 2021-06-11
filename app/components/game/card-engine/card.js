import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';
import { arg } from 'ember-arg-types';
import plugable from '../../../decorators/plugable';
import domManipulator from '../../../decorators/domManipulator';

/**
 * Set of game cards and drag/play card logic.
 */
@plugable
@domManipulator
export default class CardGame extends Component {
  @inject animationManager;

  dom = null;
  backSide = true;

  // Component Input Properties
  // --------------------------
  @arg card;
  @arg selectedAnswer;
  @arg @tracked playedCards;

  get position() {
    if(this.playedCards)
      return this.playedCards.find((c) => c.id === this.card.id).position;
    return null;
  }

  /**
   * Load dom and set timeout for triggering flip animation and
   * revealing card.
   * @param element
   */
  @action
  loadDom(element) {
    set(this, 'dom', element);
    setTimeout(() => {
      if(!this.isDestroyed) this.flipCardOnPositionUpdate();
    }, 1000);
  }

  /**
   * Calculate screen coordinates of the center of the current card.
   * If stackCenterCoordinates are passed returns coordinates with the
   * center of the stack as point of reference.
   * @param stackCenterCoordinates
   * @return {{x: number, y: number}|{x: *, y: *}}
   */
  @action
  calculateScreenCoordinates(stackCenterCoordinates) {
    if(!this.dom) return;

    const coordinates = this.getScreenCenterCoordinates(this.dom);
    if(!stackCenterCoordinates) return coordinates;
    return {
      x: coordinates.x - stackCenterCoordinates.x,
      y: coordinates.y - stackCenterCoordinates.y
    }
  }

  /**
   * Flip card animation.
   * @return {Promise<void>}
   */
  @action
  async flipCard() {
    await this.animationManager.flipCard(this.dom);
    set(this, 'backSide', !this.backSide);
  }

  /**
   * When the card is positioned at the top of the deck
   * flip it. If the card was at the top and a new card
   * is put over it flip it again.
   * @return {Promise<void>}
   */
  @action
  async flipCardOnPositionUpdate() {
    if(this.position === 0 && this.backSide ||
       this.position === 1 && !this.backSide)
      this.flipCard();
  }

  @action
  liftCard() {
    this.animationManager.liftCard(this.dom);
  }

  @action
  dropCard() {
    this.animationManager.dropCard(this.dom);
  }
}
