import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Achievement extends Component {
  // Component Input Properties
  // --------------------------
  @arg id;
  @arg icon;
  @arg title;
  @arg description;
  @arg howToUnlock;
  @arg unlocked;
  @arg completed;
  @arg points;
  @arg action;

  @action callAction() {
    // TODO: Fix this
    this.action(this.id - 1);
  }
}
