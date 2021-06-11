import classic from 'ember-classic-decorator';
import { set } from '@ember/object';

/**
 * This decorator defines an input property "reference" in which the
 * current component is injected. Parent component can use it to get
 * the reference of a child component.
 *
 * (!) This decorator only works with Ember Components.
 *
 * @param Class
 * @returns {{new(): Reference, reference: this, prototype: Reference}}
 */
@classic
export function reference(Class) {
  return class Reference extends Class {
    parent = null;
    reference = null;

    passComponentReference() {
      if(!this.parent) return this.set('reference', this);
      return set(this.parent, this.reference, this);
    }

    didInsertElement() {
      this.passComponentReference();
      super.didInsertElement();
    }
  }
}
