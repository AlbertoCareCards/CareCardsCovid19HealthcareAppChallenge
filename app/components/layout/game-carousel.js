import Component from '@glimmer/component';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';

/**
 * This application is a single-page APP with two main views: tutorial
 * and gameplay. To switch between views we have set up this component,
 * which defines a carousel with each view and allow users to navigate
 * by swiping.
 */
export default class GameCarousel extends Component {
  carousel = null;
  tutorial = null;

  // Component Input Properties
  // --------------------------
  @arg deck;
  @arg wallet;
  @arg prizes;
  @arg prizesBasket;
  @arg language;
  @arg achievements;
  @arg loadWallet;
  @arg togglePrize;
  @arg selectLanguage;
  @arg completeAchievement;

  /**
   * When slide is swiped checks its index:
   * 0: back to tutorial view, enable swipe.
   * 1: game starts, disable swipe.
   * @param {number} slideIndex
   */
  @action lockCarouselOnGameplayView(slideIndex) {
    if(slideIndex) {
      this.carousel.disableSlider();
      this.tutorial.resetTutorial();
    }
  }

  /**
   * Returns to welcome page.
   */
  @action returnHome() {
    this.carousel.enableSlider();
    this.carousel.goToSlide(0);
  }
}
