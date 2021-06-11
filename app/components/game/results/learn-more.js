import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { arg } from 'ember-arg-types';

export default class LearnMore extends Component {
  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg options;
  @arg selectCountry;
  @arg @tracked selectedCountry;
  @arg selectLanguage;
  @arg selectedLanguage;
  @arg returnToMenu;

  get carecardsArticles() {
    return this.deck.followUps?.articleRecommendations?.carecards;
  }

  get selectedCountryArticles() {
    if(!this.selectedCountry) return [];
    const selectedCountryKey = this.selectedCountry.key;
    return this.deck?.followUps?.articleRecommendations[selectedCountryKey];
  }

  get availableCountries() {
    const countryKeys = Object.keys(this.deck.followUps.doctorSearch);
    return countryKeys.map((k) => this.deck.followUps.doctorSearch[k]);
  }
}
