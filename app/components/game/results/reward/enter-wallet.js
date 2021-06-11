import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class EnterWallet extends Component {
  // Component Input Properties
  // --------------------------
  @arg changeSection;
  @arg loadWallet;

  @action createNewWallet() {
    this.changeSection(1);
  }

  @action async enterWallet() {
    await this.loadWallet();
    this.changeSection(2);
  }
}
