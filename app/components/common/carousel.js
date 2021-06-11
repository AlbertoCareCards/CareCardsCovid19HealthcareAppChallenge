/* eslint-disable ember/no-jquery */
import $ from 'jquery';
import Component from '@ember/component';
import { reference } from '../../decorators/reference';

const slickDefaultConfiguration = {
  accessibility: true,
  adaptiveHeight: false,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: true,
  asNavFor: null,
  centerMode: true,
  centerPadding: '0px',
  cssEase: 'ease',
  dots: false,
  draggable: true,
  fade: false,
  focusOnSelect: false,
  easing: 'linear',
  edgeFriction: 0.15,
  infinite: true,
  initialSlide: 0,
  lazyLoad: 'ondemand',
  mobileFirst: false,
  pauseOnHover: true,
  pauseOnDotsHover: false,
  respondTo: 'window',
  responsive: null,
  rows: 1,
  slide: '',
  slidesPerRow: 1,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  swipe: true,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  variableWidth: false,
  vertical: false,
  verticalSwiping: false,
  rtl: false,
}

/**
 * Implementation of Slick Carousel in Ember.
 */
@reference
export default class Carousel extends Component {
  // Component Input Properties
  // --------------------------
  onSlideChange = null;
  dots = false;
  slidesToShow = 1;
  centerPadding = '0px';
  variableWidth = false;
  accessibility = true;
  swipe = true;

  // Component Auxiliar Functions
  // ----------------------------
  /**
   * Disable key and swipe navigation in carousel
   */
  disableSlider() {
    $(this.element).slick('slickSetOption', 'accessibility', false);
    $(this.element).slick('slickSetOption', 'swipe', false);
  }

  /**
   * Enable key and swipe navigation in carousel
   */
  enableSlider() {
    $(this.element).slick('slickSetOption', 'accessibility', true);
    $(this.element).slick('slickSetOption', 'swipe', true);
  }

  /**
   * Navigate to specific slide.
   * @param {number} index - Slide index to navigate to
   */
  goToSlide(index) {
    $(this.element).slick('slickGoTo', index);
  }

  /**
   * Instantiates Slick Carousel in current component
   */
  initializeSlick() {
    const configuration = Object.assign(slickDefaultConfiguration, {
      dots: this.dots,
      centerPadding: this.centerPadding,
      variableWidth: this.variableWidth,
      slidesToShow: this.slidesToShow,
      accessibility: this.accessibility,
      swipe: this.swipe });
    $(this.element).slick(configuration);
  }

  /**
   * Creates observer that triggers the onSlideChange function property
   * when the carousel finish a transition animation between slides.
   */
  addSlideChangeCallback() {
    $(this.element).on('afterChange', (event, slick, currentSlide) => {
      if(this.onSlideChange) this.onSlideChange(currentSlide);
    });
  }

  // Component Hooks
  // ---------------
  didInsertElement() {
    this.initializeSlick();
    this.addSlideChangeCallback();
  }
}
