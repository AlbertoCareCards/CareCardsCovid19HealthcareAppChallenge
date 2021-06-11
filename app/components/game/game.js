import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';

// TODO: Bind this to the SCSS corresponding property.
const PHONEBREAKPOINT = 415;

/**
 * Game logic. Controls communication between the board and
 * the card deck, and coordinates it with user actions to implement
 * the game mechanics.
 */
export default class Game extends Component {
  playedCards = [];
  playedAnswers = []
  selectedAnswer = null;
  cardEngine = null;
  gameMode = null;
  resultsModal = null;
  pauseModal = null;
  finished = false;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg wallet;
  @arg prizes;
  @arg prizesBasket;
  @arg achievements;
  @arg returnHome;
  @arg loadWallet;
  @arg togglePrize;
  @arg completeAchievement;

  /**
   * Copy deck cards to keep track of the user game.
   */
  constructor() {
    super(...arguments);
    this.initializeGameMode();
    this.initializePlayedCards();
    this.initializePlayedAnswers();
  }

  // Component Auxiliar Functions
  // ----------------------------
  /**
   * Selects desktop or phone game board according to screen size.
   */
  setGameMode() {
    set(this, 'gameMode', screen.width > PHONEBREAKPOINT ? 'desktop' : 'phone');
  }

  /**
   * Initializes board display by selecting board according to window width
   * and creating a listener that update the board according th window size
   * changes.
   */
  initializeGameMode() {
    this.setGameMode();
    window.addEventListener('resize', () => this.setGameMode());
  }

  /**
   * Initializes played cards by copying deck cards and assigning
   * a null value and a position. Position will relevant to keep track
   * of the deck state.
   */
  initializePlayedCards() {
    const playedCards = this.deck.cards.map((card, index) =>
      Object.assign(card, {
        value: card.value ? card.value : null,
        position: this.deck.cards.length - index - 1 }));
    set(this, 'playedCards', playedCards);
  }

  /**
   * Intialize played answers by sorting them by score. This way we can always be sure
   * we can assume answers are ordered score-wise.
   */
  initializePlayedAnswers() {
    const playedAnswers = this.deck.answers.sort((a1, a2) => a1.score < a2.score);
    set(this, 'playedAnswers', playedAnswers);
  }

  /**
   * Given a card and a played card compares their positions to infer what is its
   * new position in the deck.
   * @param {Object} card
   * @param {Object} playedCard
   * @param {boolean} undoing
   * @return {number|*}
   */
  updatePosition(card, playedCard, undoing = false) {
    // Replayed cards are cards that are moved from one answer deck to other
    const wasReplayed = (!!playedCard.value);

    // Returning a card from an answer deck to the deck
    if (undoing && wasReplayed) {
      if (card.id === playedCard.id) return 0;
      return card.position +
        (card.position >= 0 || card.position < playedCard.position ? 1 : 0);
    // Taking a card which is in the deck (not the top one) and putting it at the top.
    // Happens when resetting the game to all the deck cards but the top one.
    } else if(undoing && !wasReplayed && playedCard.position > 0) {
      if (card.id === playedCard.id) return 0;
      return card.position + (card.position >= 0 ? 1 : 0);
    // Playing a card from the deck
    } else if(!undoing) {
      return card.position - (wasReplayed ? 0 : 1)
    // Undoing an undone card
    } else {
      return card.position
    }
  }

  /**
   * Updates state cards by reducing in 1 their position and assigning
   * the answer passed to the corresponding played card in cards.
   * @param {Object} playedCard
   * @param {Object} answer
   */
  updatePlayedCards(playedCard, answer) {
    const updatedCards = this.playedCards.map((card) =>
      Object.assign({ ...card }, {
        position: this.updatePosition(card, playedCard, !answer),
        value: card.id === playedCard.id ? answer : card.value
      }));
    set(this, 'playedCards', updatedCards);
  }

  /**
   * Checks if all cards were played
   */
  isGameFinished() {
    return !this.playedCards.some((c) => c.value === null);
  }

  /**
   * If game is over display results
   */
  async finishGame() {
    this.resultsModal.show();
    this.completeAchievement(this.achievements[0]);
    set(this, 'finished', true);
  }

  /**
   * Updates selectedAnswer attribute. This is the attribute we will
   * use to assign an answer to a card when the game engine detects
   * that the user dropped a card on the board.
   * @param {Object} answer
   */
  @action selectAnswer(answer) {
    set(this, 'selectedAnswer', answer);
  }

  /**
   * Are the game conditions right for the user to play the card?
   * @return {boolean}
   */
  @action canPlayCard() {
    return this.selectedAnswer !== null;
  }

  /**
   * This action is invoked by the game engine when a card is dropped.
   * The function updates the collection of "playedCards", assigning
   * the current selected answer to the card passed by the game engine.
   * @param {Object} card
   */
  @action playCard(card) {
    this.updatePlayedCards(card, this.selectedAnswer);
    this.selectAnswer(null);
    if(this.isGameFinished()) this.finishGame();
  }

  /**
   * This action is invoked by the game engine when a card is returned
   * to the deck. Remove value from card.
   * @param card
   */
  @action undoCard(card) {
    this.updatePlayedCards(card, null);
    this.selectAnswer(null);
  }

  /**
   * Locate latest card played (position = -1) and returns it to the deck.
   */
  @action rewindLastPlayedCard() {
    const lastPlayedCard = this.playedCards.find((c) => c.position === -1);
    this.cardEngine.returnCardToDeck(lastPlayedCard);
  }

  /**
   * Throw card out of the deck and assigning passed answer to it. Use this method to
   * launch cards out of the deck manually.
   * @param answer
   */
  @action discardTopDeckCard(answer) {
    this.selectAnswer(answer);
    const topDeckCard = this.playedCards.find((c) => c.position === 0)
    if(topDeckCard) this.cardEngine.discardCard(topDeckCard, 50, 50);
  }

  /**
   * Pause game by displaying pause modal.
   */
  @action pauseGame() {
    this.pauseModal.show();
  }

  /**
   * Returns all cards to deck in the proper order to
   * allow users to start playing a totally new game
   * session.
   */
  @action resetGame() {
    this.cardEngine.returnAllCardsToDeck();
  }

  /**
   * Resets game and comes back to welcome screen.
   */
  @action quitGame() {
    this.cardEngine.returnAllCardsToDeck();
    this.returnHome();
  }
}
