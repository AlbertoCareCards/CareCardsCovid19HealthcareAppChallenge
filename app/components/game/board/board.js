import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';

/**
 * Game board for desktop screens.
 */
export default class Board extends Component {
  // Component Input Properties
  // --------------------------
  @arg answers;

  // Component Auxiliar Functions
  // ----------------------------
  hasOddAnswer() {
    return this.answers.length % 2 === 1;
  }

  // Component Computed Properties
  // -----------------------------
  @computed('answers')
  get oddAnswer() {
    return this.hasOddAnswer() ? this.answers[0] : null;
  }
}
