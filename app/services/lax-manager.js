/* eslint-disable no-undef */
import Service from '@ember/service';
import { debug } from '@ember/debug';

/**
 * Lax Manager:
 * https://github.com/redpencilio/ember-lax/blob/master/addon/services/lax.js
 */
export default class LaxManager extends Service {
  userCount = 0;

  constructor() {
    super(...arguments);
    lax.setup();
  }

  addWatchedElement( domNode, name ) {
    debug(`Adding watched element ${name}`);
    this.userCount++;
    if( this.userCount === 1 )
      this.enableLax();
    lax.addElement( domNode );
  }

  removeWatchedElement( domNode, name ) {
    debug(`Removing watched element ${name}`);
    this.userCount--;
    if( this.userCount === 0 )
      this.disableLax();
    lax.removeElement( domNode );
  }

  addListener( name ) {
    debug(`Adding listener ${name}`);
    this.userCount++;
    if( this.userCount === 1 )
      this.enableLax();
    this.repopulate();
  }

  removeListener( name ) {
    debug(`Removing listener ${name}`);
    this.userCount--;
    if( this.userCount === 0 )
      this.disableLax();
    else
      this.repopulate();
  }

  enableLax() {
    document.getElementById('laxScrollChild')
            .parentElement
            .addEventListener('scroll', this.updateLaxPosition);
  }

  disableLax() {
    document.getElementById('laxScrollChild')
      .parentElement
      .removeEventListener('scroll', this.updateLaxPosition);
  }

  repopulate() {
    lax.populateElements();
  }

  updateLaxPosition() {
    const scroller = document.getElementById('laxScrollChild');
    const scroll = scroller ? scroller.parentElement.scrollTop : window.scrollY;
    window.requestAnimationFrame(() => {
      lax.update(scroll);
    });
  }
}
