import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';

export const loadEvents = (props) => {
  loadPhoneEvents(props);
  loadButtonEvents(props);
}