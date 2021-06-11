import { action } from '@ember/object';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';

@classic
export default class LaxComponent extends Component {
  @service laxManager;

  tagName = "";
  name = "lax component";

  didInsertElement() {
    this.laxManager.addListener( this.name );
  }

  willDestroyElement() {
    this.laxManager.removeListener( this.name );
  }

  @action
  update() {
    this.laxManager.repopulate();
  }
}
