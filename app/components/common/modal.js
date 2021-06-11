import Component from '@glimmer/component';
import plugable from '../../decorators/plugable';
import { action, set } from '@ember/object';
import { inject } from '@ember/service';

@plugable
export default class Modal extends Component {
  @inject animationManager;

  dom = null;
  displayed = false;

  @action
  async loadDom(element) {
    set(this, 'dom', element);
  }

  @action
  async show() {
    if(this.displayed) return Promise.resolve();
    await this.animationManager.showModal(this.dom);
    set(this, 'displayed', true);
  }

  @action
  async hide() {
    if(!this.displayed) return Promise.resolve();
    await this.animationManager.hideModal(this.dom);
    set(this, 'displayed', false);
  }
}
