'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Fingerprint configuration to exclude images. It breaks current build.
    // ---------------------------------------------------------------------
    fingerprint: {
      enabled: false
    },

    // Ember Math Helpers configuration
    // --------------------------------
    'ember-math-helpers': {
      only: ['mult']
    },

    // StoryBook configuration
    // -----------------------
    'ember-cli-storybook': {
      enableAddonDocsIntegration: true,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Slick Carousel
  // --------------
  app.import('node_modules/slick-carousel/slick/slick.js');
  app.import('node_modules/slick-carousel/slick/slick.css');
  app.import('node_modules/slick-carousel/slick/slick-theme.css');

  // Lax
  // ---
  app.import('node_modules/lax.js/lib/lax.min.js');

  return app.toTree();
};
