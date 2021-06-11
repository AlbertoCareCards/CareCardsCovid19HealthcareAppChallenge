import { set } from '@ember/object';
import { arg } from 'ember-arg-types';

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
export default function plugable(Class) {
  return class Plugable extends Class {
    @arg plug;
    @arg parent;

    passComponentReference() {
      if(this.plug && this.parent)  set(this.parent, this.plug, this);
    }

    constructor(owner, args) {
      super(owner, args);
      this.passComponentReference();
    }
  }
}
