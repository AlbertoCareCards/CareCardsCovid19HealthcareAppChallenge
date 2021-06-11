import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { arg } from 'ember-arg-types';

export default class Report extends Component {
  carousel = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg score;
  @arg options;
  @arg selectLanguage;
  @arg selectedLanguage;
  @arg @tracked playedCards;
  @arg returnToMenu;

  get maxScore() {
    const maxAnswerScore = Math.max(...this.deck.answers.map((a) => a.score));
    return this.playedCards.length * maxAnswerScore;
  }

  get scoreBarProgress() {
    return (this.score / this.maxScore) * 100;
  }
}
