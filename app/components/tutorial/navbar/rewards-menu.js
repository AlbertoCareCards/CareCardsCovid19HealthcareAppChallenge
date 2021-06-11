import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * This is the menu displayed inside the modal defined under
 * the tutorial navbar to explain users about the functioning
 * of the rewards.
 */
export default class RewardsMenu extends Component {
  gameInformation = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg modal;
  @arg achievements;

  @action
  closeModal() {
    this.modal.hide();
  }
}
