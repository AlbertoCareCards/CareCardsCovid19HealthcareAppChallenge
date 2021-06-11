import Service from '@ember/service';

const coronaAnxietyEN = [
  {
    icon: "coffee",
    title: "Free coffee at Starbucks",
    description: "Enjoy a free cup of coffee at your favorite Coffee place.",
    price: 10
  },
  {
    icon: "tree",
    title: "Meditation Course",
    description: "Learn to be in control of yourself and how to relax with this interesting course.",
    price: 30
  },
  {
    icon: "music",
    title: "One Month Premium Account",
    description: "Enjoy the most relaxing music playlist by enjoying one free month of Spotify Premium subscription.",
    price: 50
  },
];

const prizes = {
  coronaAnxiety: {
    'en-us': coronaAnxietyEN
  }
}

/**
 * Service responsible of loading game prizes catalogue.
 */
export default class PrizesManager extends Service {
  /**
   * Requests game achievements to the server
   * @param {string} deck - name of the test
   * @param {string} language - language of the test
   * @return {Promise<unknown>}
   */
  loadPrizes(deck, language) {
    return new Promise(resolve => resolve(prizes[deck][language]));
  }
}
