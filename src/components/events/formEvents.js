import { loadPhoneEvents } from './phoneEvents';
import { loadButtonEvents } from './buttonEvents';

export const loadEvents = () => {
  loadPhoneEvents();
  loadButtonEvents();
}