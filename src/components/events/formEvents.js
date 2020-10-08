import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';
import { loadQuantityEvents } from './quantityEvents';
import { loadSizeEvents } from './sizeEvents';

export const loadEvents = (props) => {
  loadPhoneEvents(props);
  loadButtonEvents(props);
  loadQuantityEvents(props);
  loadSizeEvents(props);
}