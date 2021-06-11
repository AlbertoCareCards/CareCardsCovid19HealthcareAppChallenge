import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class PrizesCatalogue extends Component {
  // Component Input Properties
  // --------------------------
  @arg changeSection;
  @arg loadWallet;
  @arg prizes;
  @arg prizesBasket;
  @arg togglePrize;

  @action confirmPrizeSelection() {
    this.changeSection(4);
  }
}
