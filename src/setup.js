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

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const configureState = (state) => new Promise(resolve => resolve(state));

export const start = () => {
  console.log('[start]');
  const state = createState();
  const setupStart = compose(
    configureState(state, document),
    getJsonRequest,
    setDefaultPrice,
    hideRequiredText,
    getHtmlForm,
    injectHtmlForm,
    loadFormEvents,
    updatePrice
  );
  setupStart();
}
