import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class GetWallet extends Component {
  // Component Input Properties
  // --------------------------
  @arg changeSection;
  @arg loadWallet;

  @action async enterWallet() {
    await this.loadWallet(null, null);
    this.changeSection(2);
  }
}
