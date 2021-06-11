import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Navbar extends Component {
  modal = null;
  rewardsModal = null;
  selectedLanguage = null;

  options = [
    {
      title: 'EN',
      payload: 'en-us'
    },
    {
      title: 'DE',
      payload: 'de'
    },
    {
      title: 'ES',
      payload: 'es'
    }
  ]

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg language;
  @arg achievements;
  @arg selectLanguage;

  /**
   * Sets current intl language option in dropdown.
   */
  constructor() {
    super(...arguments);
    const currentLanguageOption = this.options.find((o) => o.payload === this.language);
    set(this, 'selectedLanguage', currentLanguageOption);
  }

  @action
  changeLanguage(language) {
    this.selectLanguage(language);
  }

  @action
  toggleModal() {
    this.modal.show();
  }

  @action
  toggleRewardsModal() {
    this.rewardsModal.show();
  }
}
