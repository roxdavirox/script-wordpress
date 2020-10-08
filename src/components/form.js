import { getFormCookie } from '../services/cookieService';
import { loadEvents } from './events/formEvents';

export const getJsonRequest = (props) => {
  console.log('[getJsonRequest] props', props);
  const { document, setState } = props;
  const [json] = document.getElementsByClassName('sku');
  const { innerText } = json;
  const jsonData = JSON.parse(innerText);
  setState({ json: jsonData });
  return props;
}

export const injectHtmlForm = (props) => {
  const { document, html } = props;
  document.getElementById('form-container').innerHTML = html;
  return props
}

export const setDefaultPrice = props => {
  console.log('[setDefaultPrice] props', props);
  const defaultPrice = `R$ --,--`;
  document.getElementsByClassName('elementor-widget-woocommerce-product-price')[0]
    .children[0]
    .children[0].innerText = defaultPrice;
  return props;
}

export const hideRequiredText = props => {
  console.log('[hideRequiredText]');
  const hasFormCookie = getFormCookie();
  if (!hasFormCookie) return props;
  document.getElementById('info-fill-form').style.display = 'none';
  return props
}

export const loadFormEvents = (props) => {
  console.log('[loadFormEvents]');
  loadEvents();
  return props;
}