import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * Basic dropdown component.
 * - Options are loaded in "options": an array of dicts with title and payload
 * - Additional image flag for displaying icons in options.
 */
export default class Dropdown extends Component {
  isOpen = false;
  selected = null;
  dropdown = null;

  // Component Input Properties
  // --------------------------
  @arg options;
  @arg placeholder;
  @arg onChangeCallback;
  @arg initialSelection;
  @arg verticalPosition = 'auto';

  constructor() {
    super(...arguments);
    if(this.initialSelection) this.updateSelectedItem();
  }

  @action
  updateSelectedItem() {
    set(this, 'selected', this.initialSelection);
  }

  @action
  registerPowerSelect(component) {
    set(this, 'dropdown', component);
  }

  @action
  selectItem(item) {
    set(this, 'selected', item);
    if(this.onChangeCallback) this.onChangeCallback(item.payload);
  }

  /**
   * Manual dropdown trigger for non-click events. Without it dropdown does not
   * seem to work as expected.
   * @param event
   */
  @action
  toggle() {
    set(this, 'isOpen', !this.isOpen);
    if(!this.isOpen) {
      this.dropdown.actions.close();
    } else {
      this.dropdown.actions.open();
    }
  }
}
