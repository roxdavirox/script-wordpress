import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';
import { loadQuantityEvents } from './quantityEvents';

export const loadEvents = (props) => {
  loadPhoneEvents(props);
  loadButtonEvents(props);
  loadQuantityEvents(props);
}