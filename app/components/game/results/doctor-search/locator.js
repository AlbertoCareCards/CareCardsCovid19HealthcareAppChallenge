import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Locator extends Component {
  // Component Input Properties
  // --------------------------
  @arg specialist;

  @action
  loadHclSdk(sdkElement) {
    sdkElement.init({
      apiKey: '30006698f4baead2',
      appName: 'CareCards',
      appURL: 'https://care-cards.io',
      entry: {
        // screenName: 'searchNearMe',
        // specialtyCode: this.specialist
      }
    })
  }
}
