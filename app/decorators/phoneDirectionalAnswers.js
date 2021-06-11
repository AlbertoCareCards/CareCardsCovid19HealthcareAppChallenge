import { tracked } from '@glimmer/tracking';
import { arg } from 'ember-arg-types';

/**
 * This decorator defines a set of answer properties for a component. It is used
 * by the answers and phone-board components in order to sort deck answers by their
 * position (top/bottom/left/right).
 *
 * @param Class
 * @return {{new(): PhoneDirectionalAnswers, prototype: PhoneDirectionalAnswers}}
 */
export default function phoneDirectionalAnswers(Class) {
  return class PhoneDirectionalAnswers extends Class {
    @arg @tracked answers;

    get displayableAnswer() {
      return this.hasOddAnswer() ? this.answers.slice(1) : this.answers;
    }

    get leftAnswer() {
      const index = this.displayableAnswer.length > 2 ? 1 : 0;
      return this.displayableAnswer[index];
    }

    get rightAnswer() {
      const index = this.displayableAnswer.length - 1;
      return this.displayableAnswer[index];
    }

    get topAnswer() {
      if (this.displayableAnswer.length > 2)
        return this.displayableAnswer[2];
      return null;
    }

    get bottomAnswer() {
      if (this.displayableAnswer.length > 2)
        return this.displayableAnswer[0];
      return null;
    }
  }
}
