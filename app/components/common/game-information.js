import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import plugable from '../../decorators/plugable';

/**
 * Game information (legal, about us, contact, etc) to be displayed
 * in different modal screens.
 */
@plugable
export default class GameInformation extends Component {
  @inject panelActions;

  @action closeAllTabs() {
    this.panelActions.closeAll('gameInformation');
  }
}
