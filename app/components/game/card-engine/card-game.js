import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';
import { arg } from 'ember-arg-types';
import * as swing from 'swing';
import plugable from '../../../decorators/plugable';
import domManipulator from '../../../decorators/domManipulator';

// Represents the length (in % of the card width) the user
// has to drag a card to be considered as played by swing.
const OFFSETRATIO = .8;

/**
 * Set of game cards and drag/play card logic.
 */
@plugable
@domManipulator
export default class CardGame extends Component {
  @inject eventBusManager;

  swingCards = [];
  swingStack = null;
  swingWrapper = null;
  dragConfidence = 0;
  stackCenterCoordinates = null;

  // Component Input Properties
  // --------------------------
  @arg cards;
  @arg canPlayCard;
  @arg playedCards;
  @arg answers;
  @arg selectedAnswer;
  @arg throwInCallback;
  @arg throwOutCallback;

  // Card DOM and Data logic
  // -----------------------
  /**
   * Returns card by its ID.
   * @param {string} id
   * @return {Object}
   */
  findCardById(id) { return this.playedCards.find(c => c.id === id); }

  /**
   * Return index of card in playedCards array by its ID.
   * @param id
   * @return {*}
   */
  findCardIndexById(id) { return this.playedCards.findIndex(c => c.id === id) }

  /**
   * Returns card by its HTMLElement.
   * @param domCard
   * @return {*}
   */
  findCardByDomElement(domCard) { return this.findCardById(domCard.id); }

  // Card game drag logic
  // --------------------
  /**
   * Returns a number between 0 and 1, indicating how complete the drag is. This is used
   * by Swing to determine if a card was dragged out of the deck or not.
   * @param domCard - DOM Card element as reference for calculating the confidence.
   * @param xOffset - drag position in x axis
   * @param yOffset - drag position in y axis
   * @param offsetRatio - taking the deck div this means which % of the
   * height/width is considered enough to take the drag as completed.
   * @return {number}
   */
  dragCompletion(domCard, xOffset, yOffset, offsetRatio) {
    const xConfidence = Math.min(Math.abs(xOffset) / (domCard.offsetWidth * offsetRatio), 1);
    const yConfidence = Math.min(Math.abs(yOffset) / (domCard.offsetHeight * offsetRatio), 1);
    return Math.max(xConfidence, yConfidence);
  }

  /**
   * Reduce opacity of played cards according to drag confidence.
   */
  focusSelectedCard(confidence) {
    [].forEach.call(this.swingWrapper.querySelectorAll('.mind-out-deck:not(.mind-dragging)'),
    (domPlayedCard) => {
      domPlayedCard.style.opacity = `${1 - confidence}`;
      domPlayedCard.style['pointer-events'] = `none`;
    });
  }

  /**
   * After a card is played restore the opacity of the remaining cards.
   * Opacity is changed due to the focusSelectedCard function.
   */
  restoreCardOpacity() {
    [].forEach.call(this.swingWrapper.querySelectorAll('.mind-out-deck'),
      (domPlayedCard) => {
        domPlayedCard.style.opacity = `1`;
        domPlayedCard.style['pointer-events'] = `auto`;
      });
  }

  /**
   * Calculate screen coordinates on current drag event and transmit them
   * via event bus signal.
   * @param xOffset
   * @param yOffset
   * @param domCard
   */
  emitDragCoordinates(xOffset, yOffset, domCard) {
    const x = this.stackCenterCoordinates.x + xOffset;
    const y = this.stackCenterCoordinates.y + yOffset;
    this.eventBusManager.publish('dragAnswer', { x, y, domCard, xOffset, yOffset });
  }

  /**
   * Logic to be triggered when a card is being dragged. The function returns
   * the drag confidence. When confidence is 1 swing will drop the card out of
   * the deck.
   * @param xOffset - drag position in x axis
   * @param yOffset - drag position in y axis
   * @param domCard - taking the deck div this means which % of the
   * height/width is considered enough to take the drag as completed.
   * @return {number}
   */
  dragging(xOffset, yOffset, domCard) {
    this.dragConfidence = this.dragCompletion(domCard, xOffset, yOffset, OFFSETRATIO);

    // Send signal for card/answer drag
    this.emitDragCoordinates(xOffset, yOffset, domCard);

    // Change played cards opacity according to drag confidence.
    this.focusSelectedCard(this.dragConfidence);

    // Return confidence.
    return this.canPlayCard ?
      this.canPlayCard() && this.dragConfidence : this.dragConfidence;
  }

  throwInCard(domCard) {
    domCard.classList.remove('mind-out-deck');
    if(this.throwInCallback) this.throwInCallback(this.findCardByDomElement(domCard));
  }

  throwOutCard(domCard) {
    domCard.classList.add('mind-out-deck');
    if(this.throwOutCallback) this.throwOutCallback(this.findCardByDomElement(domCard));
  }

  startDragCard(domCard) {
    domCard.classList.add('mind-dragging');
  }

  endDragCard(domCard) {
    domCard.classList.remove('mind-dragging');
    this.restoreCardOpacity();
  }

  // Swing Configuration logic
  // -------------------------
  /**
   * Calculate screen coordinates of the center of the stack div.
   * @param stackElement
   */
  loadStackCoordinates(stackElement) {
    set(this, 'stackCenterCoordinates', this.getScreenCenterCoordinates(stackElement));
  }

  /**
   * Generates initial swing configuration.
   */
  swingConfiguration(element) {
    const domStack = element.querySelector('.stack');
    return {
      allowedDirections: [
        swing.Direction.LEFT,
        swing.Direction.RIGHT,
        swing.Direction.UP,
        swing.Direction.DOWN
      ],
      minThrowOutDistance: domStack.offsetHeight * 1.30,
      maxThrowOutDistance: domStack.offsetHeight * 1.35,
      throwOutConfidence: (xOffset, yOffset, element) => this.dragging(xOffset, yOffset, element)
    }
  }

  /**
   * Instantiates swing deck and load all required dependencies in
   * the component.
   * @param element
   */
  @action initializeStack(element = null) {
    this.swingCards = [];
    this.swingWrapper = element;
    this.swingStack = swing.Stack(this.swingConfiguration(element));

    // Intialize coordinates
    this.loadStackCoordinates(element);

    // Initialize cards
    [].forEach
      .call(
        element.querySelectorAll('.mind-swing-card'),
        (targetElement) => {
          this.swingCards.push(this.swingStack.createCard(targetElement));
        }
      );

    // Initialize callbacks
    this.swingStack.on('throwinend', (domCard) => this.throwInCard(domCard.target));
    this.swingStack.on('throwoutend', (domCard) => this.throwOutCard(domCard.target));
    this.swingStack.on('dragstart', (domCard) => this.startDragCard(domCard.target));
    this.swingStack.on('dragend', (domCard) => this.endDragCard(domCard.target));
  }

  // Game Logic - Managing Cards
  // ---------------------------
  /**
   * Given an already played card and out of the deck takes care of
   * returning it to the deck. When the card is returned to the deck
   * the 'throwInCallback' logic is triggered.
   * @param card - Deck card
   */
  @action
  returnCardToDeck(card) {
    if(!card) return;
    const cardIndex = this.findCardIndexById(card.id);
    const swingCard = this.swingCards[cardIndex];
    const throwInCoordinates = this[`card${card.id}`].calculateScreenCoordinates(this.stackCenterCoordinates);
    swingCard.throwIn(throwInCoordinates.x, throwInCoordinates.y);
  }

  /**
   * Throws card out of the deck. When the card is thrown out of
   * the deck the 'throwOutCallback' logic is triggered.
   * @param card - Deck card
   * @param xOffset - X displacement from card current position
   * @param yOffset - Y displacement from card current position
   */
  @action
  discardCard(card, xOffset, yOffset) {
    const cardIndex = this.findCardIndexById(card.id);
    const swingCard = this.swingCards[cardIndex];
    swingCard.throwOut(xOffset, yOffset);
  }

  /**
   * Takes each card in the deck and return it back to them.
   * Cards that are already in deck are returned again in order
   * to respect the original order of each card.
   */
  @action
  returnAllCardsToDeck() {
    this.playedCards.forEach((c, index) => {
      // TODO: the timeout makes that flip animations dont overlap. This has to be changed.
      setTimeout(() => this.returnCardToDeck(c), (1+ index) * 1000);
    });
  }

  // Component Hooks
  // ---------------
  /**
   * When the screen is resized swing deck is reloaded,
   * updating the configuration with the new screen size
   * parameters.
   * @param owner
   * @param args
   */
  constructor(owner, args) {
    super(owner, args);
    window.addEventListener('resize', () => this.initializeStack(this.swingWrapper));
  }

  /**
   * Removes screen resize listener when component is deleted.
   */
  willDestroy() {
    window.removeEventListener('resize');
    super.willDestroy();
  }
}
