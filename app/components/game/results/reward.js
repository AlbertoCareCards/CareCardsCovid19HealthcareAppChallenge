import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * Point reward system
 */
export default class Feedback extends Component {
  carousel = null;

  // Component Input Properties
  // --------------------------
  @arg wallet;
  @arg prizes;
  @arg prizesBasket;
  @arg achievements;
  @arg togglePrize;
  @arg loadWallet;

  @action changeSection(sectionIndex) {
    this.carousel.goToSlide(sectionIndex);
  }
}
