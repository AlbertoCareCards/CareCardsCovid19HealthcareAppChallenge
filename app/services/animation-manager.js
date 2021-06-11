import Service from '@ember/service';
import anime from 'animejs/lib/anime.es.js';

/**
 * Service for managing Javascript animations via animeJS
 * library.
 */
export default class AnimationManager extends Service {
  async hidePhoneAnswer(targets) {
    anime({
      targets: targets.children[1],
      opacity: 0,
      width: 0,
      'margin': 0,
      duration: 100
    });

    await anime({
      targets: targets,
      'max-width': '20px',
      duration: 300
    }).finished;
  }

  async showPhoneAnswer(targets) {
    anime({
      targets: targets.children[1],
      opacity: 1,
      'margin-left': '5px',
      width: '100%',
      duration: 300
    });

    await anime({
      targets: targets,
      'max-width': '100%',
      duration: 300
    }).finished;
  }

  async flipCard(targets) {
    await anime({
      targets: targets,
      scale: [{value: 1}, {value: 1.2}, {value: 1, delay: 250}],
      rotateY: { value: '+=180', delay: 200 },
      easing: 'easeInOutSine',
      duration: 400,
    }).finished;
  }

  async liftCard(targets) {
    await anime({
      targets: targets,
      scale: [{value: 1}, {value: 1.1}],
      easing: 'easeInOutSine',
      duration: 200,
    }).finished;
  }

  async dropCard(targets) {
    await anime({
      targets: targets,
      scale: [{value: 1.1}, {value: 1}],
      easing: 'easeInOutSine',
      duration: 200,
    }).finished;
  }

  async revealAnswers(targets) {
    targets.style.opacity = 0;
    await anime({
      targets: targets,
      opacity: 1,
      delay: 1000,
      duration: 2000,
    }).finished;
  }

  async flipPhoneQuestion(targets) {
    await anime({
      targets: targets,
      rotateX: { value: '+=180', delay: 200 },
      easing: 'easeInOutSine',
      duration: 400,
    }).finished;
  }

  async showModal(targets) {
    await anime({
      targets: targets,
      translateY: ['-100vh', '0vh'],
      easing: 'linear',
      duration: 500,
    }).finished;
  }

  async hideModal(targets) {
    await anime({
      targets: targets,
      translateY: ['0vh', '-100vh'],
      duration: 500,
      easing: 'linear',
    }).finished;
  }
}
