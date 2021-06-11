import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';

export default class Prize extends Component {
  // Component Input Properties
  // --------------------------
  @arg icon;
  @arg description;
}
