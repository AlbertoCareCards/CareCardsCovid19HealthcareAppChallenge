import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class PrizeItem extends Component {
  // Component Input Properties
  // --------------------------
  @arg icon;
  @arg title;
  @arg description;
  @arg price;
  @arg prize;
  @arg togglePrize;
  @arg @tracked basket;

  get selected() {
    return this.basket.some((bp) => bp.icon === this.prize.icon);
  }

  @action selectPrize() {
    this.togglePrize(this.prize);
  }
}
