import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class DoctorSearch extends Component {
  // Component Input Properties
  // --------------------------
  @arg options;
  @arg selectCountry;
  @arg selectedCountry;
  @arg selectLanguage;
  @arg selectedLanguage;
  @arg @tracked deck;
  @arg returnToMenu;

  get availableCountries() {
    const countryKeys = Object.keys(this.deck.followUps.doctorSearch);
    return countryKeys.map((k) => this.deck.followUps.doctorSearch[k]);
  }

  @action
  searchDoctors() {
    const url = `https://www.google.com/maps/search/${this.selectedCountry.specialist}+near+me/`;
    const win = window.open(url, '_blank');
    win.focus();
  }
}
