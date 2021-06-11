import Service from '@ember/service';
import EventEmitter from 'events';

/**
 * Simple event bus. You can subscribe callbacks to an event, and publish an event
 * with arguments that will be passed to the callbacks subscribed to the event.
 */
export default class EventBusManager extends Service {
  emitter = new EventEmitter();

  subscribe(event, callback) {
    this.emitter.on(event, callback);
  }

  unsubscribe(event, callback) {
    this.emitter.removeListener(event, callback);
  }

  publish(event, ...args) {
    this.emitter.emit(event, ...args);
  }
}
