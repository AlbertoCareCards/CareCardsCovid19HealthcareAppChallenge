import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';
import { arg } from 'ember-arg-types';

/**
 * Desktop Board answer
 */
export default class Answer extends Component {
  @inject eventBusManager;

  dimensions = null;

  // Component Input Properties
  // --------------------------
  @arg answer;
  @arg selectAnswer;

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

  /**
   * Load component coordinates for future calculation of a selected
   * answer based on drag coordinates.
   * @param element
   */
  @action
  getDeckCoordinates(element) {
    set(this, 'dimensions', element.getClientRects()[0]);
  }

  /**
   * This function is called on every drag event. The function takes the
   * drag coordinates and compares them with the element position on screen.
   * If answers match then the answer is selected.
   * @param dragCoordinates
   */
  @action
  detectAnswerSelection(dragCoordinates) {
    // Ignore logic in phone screens.
    if (!this.dimensions) return;

    const isAnswerSelected = dragCoordinates.x >= this.dimensions.left &&
    dragCoordinates.x <= this.dimensions.right &&
    dragCoordinates.y >= this.dimensions.top &&
    dragCoordinates.y <= this.dimensions.bottom;

    if (isAnswerSelected) {
      this.selectAnswer(this.answer);
    }
  }
}
