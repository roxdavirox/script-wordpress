import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';
import { loadQuantityEvents } from './quantityEvents';
import { loadSizeEvents } from './sizeEvents';
import { loadItemSelectEvents } from './itemSelectEvents';
import { loadInputEvents } from './inputEvents';

export const loadEvents = (props) => {
  console.log('[loadEvents]');
  loadPhoneEvents(props);
  loadButtonEvents(props);
  loadQuantityEvents(props);
  loadSizeEvents(props);
  loadItemSelectEvents(props);
  loadInputEvents(props);
  return props;
}