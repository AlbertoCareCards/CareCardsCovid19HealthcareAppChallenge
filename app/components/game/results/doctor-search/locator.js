import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Locator extends Component {
  // Component Input Properties
  // --------------------------
  @arg specialist;
  
  @action
  styleHclSdk(sdkWrapper) {
    sdkWrapper.style.height = '400px'
    sdkWrapper.style.width = '100%'
  }
}
