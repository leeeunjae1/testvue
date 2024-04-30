// EventBus.js
import mitt from 'mitt';

const emitter = mitt();
export const EventBus = {
    $on: emitter.on,
    $emit: emitter.emit
  };
