import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';
import plugable from '../../decorators/plugable';

@plugable
export default class Tutorial extends Component {
  dom = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg language;
  @arg achievements;
  @arg selectLanguage;

  @action resetTutorial() {
    this.dom.scrollTop = 0;
  }

  @action loadDom(element) {
    set(this, 'dom', element);
  }
}
