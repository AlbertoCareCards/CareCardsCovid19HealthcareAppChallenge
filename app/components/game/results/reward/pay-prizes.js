import Component from '@glimmer/component';
import { action, set } from '@ember/object';

export default class PayPrizes extends Component {
  prizesSent = false;
  email = null;

  @action sendEmail() {
    set(this, 'prizesSent', true);
  }
}
