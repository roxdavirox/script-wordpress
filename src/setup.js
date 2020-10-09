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
import { pipe } from './utils/pipe';

export const start = async () => {
  console.log('[start]');
  pipe(createState())
    .then(getJsonRequest)
    .then(setDefaultPrice)
    .then(hideRequiredText)
    .then(getHtmlForm)
    .then(injectHtmlForm)
    .then(updatePrice)
    .then(loadFormEvents);
}
