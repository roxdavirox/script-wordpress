import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';
import { loadQuantityEvents } from './quantityEvents';
import { loadSizeEvents } from './sizeEvents';
import { loadItemSelectEvents } from './itemSelectEvents';
import { loadInputEvents } from './inputEvents';
import { compose } from '../../utils/compose';

export const loadEvents = (props) => {
  console.log('[loadEvents]');
  const fns = [
    loadPhoneEvents,
    loadButtonEvents,
    loadQuantityEvents,
    loadSizeEvents,
    loadItemSelectEvents,
    loadInputEvents
  ].reverse();

  compose(fns)(props);
  
  return props;
}