import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * Upper navigation menu indicating total reward points gathered during
 * gameplay and total points available in wallet.
 */
export default class GetPrizes extends Component {
  // Component Input Properties
  // --------------------------
  @arg wallet;
  @arg changeSection;

  @action selectPrizes() {
    this.changeSection(3);
  }
}
