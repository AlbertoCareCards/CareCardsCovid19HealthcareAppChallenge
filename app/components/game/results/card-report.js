import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';
import { inject } from '@ember/service';
import { action, set } from '@ember/object';
import plugable from '../../../decorators/plugable';

/**
 * Set of played cards displayed in results report to inform the
 * user about the answers he selected and provide additional insights
 * about them.
 */
@plugable
export default class Report extends Component {
  @inject animationManager;

  dom = null;

  // Component Input Properties
  // --------------------------
  @arg card;

  /**
   * Load dom and set timeout for triggering flip animation and
   * revealing card.
   * @param element
   */
  @action
  loadDom(element) {
    set(this, 'dom', element);
  }

  /**
   * Flip card animation.
   * @return {Promise<void>}
   */
  @action
  async flipCard() {
    await this.animationManager.flipCard(this.dom);
  }
}
