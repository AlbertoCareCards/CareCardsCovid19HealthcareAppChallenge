import Controller from '@ember/controller';
import config from 'ember-cards/config/environment';
import { inject as service } from '@ember/service';
import { oneWay }from '@ember/object/computed';
import { action, set } from '@ember/object';

/**
 * Global controller configuration.
 */
export default class ApplicationController extends Controller {
  @service intl;
  @service deckManager;
  @service prizesManager;
  @service pointsManager;
  @service achievementManager;

  // Controller Properties
  // ---------------------
  deck = null;
  wallet = null;
  prizes = null;
  achievements = null;
  prizesBasket = [];

  // Component Computed Properties
  // -----------------------------
  @oneWay('intl.locale.0') language;

  // Controller Auxiliar Functions
  // -----------------------------
  /**
   * Load CSS variable in document to keep track of the window.innerHeight. This is
   * required to keep application responsive in mobile devices (the navbars of the browser
   * break the responsive design).
   */
  loadWindowInnerHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--screenHeight', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--screenHeight', `${vh}px`);
    });
  }

  /**
   * Load test and store it in local variable. This test will be the one
   * the game will load.
   */
  async loadDeck() {
    const deck = await this.deckManager.loadDeck(config.deck, this.intl.primaryLocale);
    this.set('deck', deck);
  }

  /**
   * Load achievements and store it in local variable. This test will be the one
   * the game will load.
   */
  async loadAchievements() {
    const achievements = await this.achievementManager.loadAchievements(config.deck, this.intl.primaryLocale);
    this.set('achievements', achievements);
  }

  /**
   * Load catalogue of prizes.
   */
  async loadPrizes() {
    const prizes = await this.prizesManager.loadPrizes(config.deck, this.intl.primaryLocale);
    this.set('prizes', prizes);
  }

  /**
   * Initializes game application.
   * @return {Promise<void>}
   */
  async initializeGame() {
    this.loadWindowInnerHeight();
    await this.loadDeck();
    await this.loadAchievements();
    await this.loadPrizes();
  }

  /**
   * Called when application is executed. Checks whether user
   * is logged in. Deletes session if user didn't check the
   * "stay logged" option. If not, loads user profile in store.
   */
  init(...args) {
    super.init(args);
    this.initializeGame();
  }

  @action
  selectLanguage(language) {
    this.intl.setLocale(language);
  }

  @action
  completeAchievement(achievement) {
    const unlockedAchievements = achievement.unlocks;
    const updateAchievements = this.achievements.map((achv) => {
      if(achievement.id === achv.id) set(achv, 'completed', true);
      if(unlockedAchievements && unlockedAchievements.includes(achv.id))
        set(achv, 'unlocked', true);
      return achv;
    })
    this.set('achievements', updateAchievements);
  }

  @action
  async loadWallet(walletAddress, walletPassword) {
    const wallet = await this.pointsManager.loadWallet(walletAddress, walletPassword);
    wallet.points = wallet.points + this.achievements.filter((achv) => achv.completed)
      .map((achv) => achv.points)
      .reduce((acc, value) => acc + value);
    set(this, 'wallet', wallet);
  }

  @action togglePrize(prize) {
    let newBasket = [];
    if (this.prizesBasket.some((pb) => pb.icon === prize.icon)) {
      newBasket = this.prizesBasket.filter((pb) => pb.icon !== prize.icon)
    } else if(this.prizesBasket.length === 0 ||
              this.prizesBasket
                .map((p) => p.price)
                .reduce((acc, value) => acc + value) <= this.wallet.points) {
      newBasket = [prize].concat(this.prizesBasket);
    }
    set(this, 'prizesBasket', newBasket);
  }
}
