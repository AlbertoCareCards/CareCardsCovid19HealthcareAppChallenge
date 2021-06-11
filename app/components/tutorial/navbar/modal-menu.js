import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * This is the menu displayed inside the modal defined under
 * the tutorial navbar.
 */
export default class ModalMenu extends Component {
  gameInformation = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg modal;

  @action
  closeModal() {
    this.modal.hide();
    this.gameInformation.closeAllTabs();
  }
}
