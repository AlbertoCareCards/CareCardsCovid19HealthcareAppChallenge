import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { arg } from 'ember-arg-types';

/**
 * Upper navigation menu indicating total reward points gathered during
 * gameplay and total points available in wallet.
 */
export default class RewardCounter extends Component {
  // Component Input Properties
  // --------------------------
  @arg @tracked achievements;
  @arg wallet;

  get rewardCounter() {
    return this.achievements
      .filter((achv) => achv.completed)
      .map((achv) => achv.points)
      .reduce((acc, value) => acc + value);
  }
}
