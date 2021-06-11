import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';

export default class Welcome extends Component {
  firstGame = true;

  // Component Input Properties
  // --------------------------
  @arg initialStep = 0;
}
