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
import { compose } from './utils/compose';

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
