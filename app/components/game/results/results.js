import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { arg } from 'ember-arg-types';
import $ from 'jquery';

export default class Results extends Component {
  section = 0;
  carousel = null;
  selectedCountry = null;
  selectedLanguage = null;

  languages = [
    {
      title: "English - USA",
      payload: "english"
    },
    {
      title: "German",
      payload: "german"
    },
    {
      title: "Spanish",
      payload: "spanish"
    }
  ]

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg modal;
  @arg wallet;
  @arg prizes;
  @arg prizesBasket;
  @arg quitGame;
  @arg resetGame;
  @arg loadWallet;
  @arg togglePrize;
  @arg achievements;
  @arg completeAchievement;
  @arg @tracked playedCards;

  // Component Auxiliar Functions
  // ----------------------------
  /**
   * Given a set of played cards calculates overall score.
   * @param playedCards
   */
  calculateScore(playedCards) {
    // If game is being resetted ignore score
    if(playedCards.some((c) => c.value === null)) return 0;
    return playedCards.map((card) => card.value.score)
                      .reduce((acc, score) => acc + score);
  }

  /**
   * Given a score find the result that matches with its
   * value.
   * @param results
   * @param score
   */
  findResult(results, score) {
    const minScores = results.map((result) => result.minScore);
    const resultIndex = minScores.findIndex((resultScore) => score < resultScore);
    return results[resultIndex !== -1 ? resultIndex - 1 : results.length - 1];
  }

  // Component Computed Properties
  // -----------------------------
  get score() {
    return this.calculateScore(this.playedCards);
  }

  get result() {
    return this.findResult(this.deck.results, this.score);
  }
  
  get availableAchievements() {
    return this.achievements.filter((a) => !a.minScore || a.minScore <= this.score);
  }

  @action
  changeSection(sectionIndex) {
    this.carousel.goToSlide(sectionIndex);
    set(this, 'section', sectionIndex);
    $('.mind-result').each((i, e) => e.parentElement.scrollTop = 0);
  }

  @action
  selectCountry(country) {
    set(this, 'selectedCountry', country);
  }

  @action
  selectLanguage(language) {
    set(this, 'selectedLanguage', language);
  }

  @action
  async restartGame() {
    await this.modal.hide();
    this.resetGame();
  }

  @action
  async cancelGame() {
    await this.modal.hide();
    this.quitGame();
  }

  @action
  completeFollowUp() {
    if(this.section < this.achievements.length)
      this.completeAchievement(this.achievements[this.section]);
    this.changeSection(0);
  }
}
