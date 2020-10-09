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

const compose = (fns) => input => fns.reduceRight((f, g) => f.then(g), Promise.resolve(input));

export const start = async () => {
  console.log('[start]');
  compose([
    getJsonRequest,
    setDefaultPrice,
    hideRequiredText,
    getHtmlForm,
    injectHtmlForm,
    loadFormEvents,
    updatePrice
  ].reverse()
  )(createState());
}
