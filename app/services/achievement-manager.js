import Service from '@ember/service';

const coronaAnxietyEN = [
  {
    id: 1,
    icon: "play",
    title: "Finish the Game",
    description: "Complete the game by playing all cards",
    howToUnlock: "Complete the game by playing all cards",
    unlocked: true,
    unlocks: [2, 3, 4],
    points: 20,
  },
  {
    id: 2,
    icon: "info-circle",
    title: "Learn about your results",
    description: "Consult information about your game results",
    howToUnlock: "Review the game results",
    unlocked: false,
    points: 20
  },
  {
    id: 3,
    icon: "newspaper",
    title: "Discover more about anxiety in Corona times",
    description: "Read at least one of the suggested Corona anxiety articles",
    howToUnlock: "Select one of the articles in the 'Learn More' section",
    unlocked: false,
    points: 15
  },
  {
    id: 4,
    icon: "hospital-user",
    title: "Find out how to find support",
    description: "Discover the specialist in your area that can help you deal with anxiety",
    howToUnlock: "Find specialist nearby",
    unlocked: false,
    points: 30,
    minScore: 10
  }
];

const achievements = {
  coronaAnxiety: {
    'en-us': coronaAnxietyEN
  }
}

/**
 * Service responsible of loading card decks in application.
 */
export default class AchievementManager extends Service {
  /**
   * Requests game achievements to the server
   * @param {string} deck - name of the test
   * @param {string} language - language of the test
   * @return {Promise<unknown>}
   */
  loadAchievements(deck, language) {
    return new Promise(resolve => resolve(achievements[deck][language]));
  }
}
