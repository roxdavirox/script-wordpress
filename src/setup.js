import { createState } from './core/state';
import { getHtmlForm } from './services/formService';
import {
  injectHtmlForm,
  getJsonRequest,
  setDefaultPrice,
  hideRequiredText,
  loadFormEvents,
  updatePrice
} from './components/form';

const configureState = (state, document) => new Promise((resolve) => {
  console.log('[configureState]', state);
  resolve({ ...state, document });
});

export const start = () => {
  console.log('[start]');
  const state = createState();
  configureState(state, document)
    .then(getJsonRequest)
    .then(setDefaultPrice)
    .then(hideRequiredText)
    .then(getHtmlForm)
    .then(injectHtmlForm)
    .then(loadFormEvents)
    .then(updatePrice);
}
