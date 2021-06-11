import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';

export default class Score extends Component {
  // Component Input Properties
  // --------------------------
  @arg score;
  @arg result;
  @arg changeSection;
  @arg achievements;
}
