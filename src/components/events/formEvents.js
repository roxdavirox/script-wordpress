import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';
import { loadQuantityEvents } from './quantityEvents';
import { loadSizeEvents } from './sizeEvents';
import { loadItemSelectEvents } from './itemSelectEvents';
import { loadInputEvents } from './inputEvents';
import { compose } from '../../utils/compose';

export const loadEvents = (props) => {
  console.log('[loadEvents]');
  compose([
    loadPhoneEvents,
    loadButtonEvents,
    loadQuantityEvents,
    loadSizeEvents,
    loadItemSelectEvents,
    loadInputEvents
  ])(props);
  return props;
}