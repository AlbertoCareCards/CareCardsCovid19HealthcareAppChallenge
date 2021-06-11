import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Introduction extends Component {
// Component Input Properties
  // --------------------------
  @arg modal;
  @arg achievements;

  @action
  closeModal() {
    this.modal.hide();
  }
}
