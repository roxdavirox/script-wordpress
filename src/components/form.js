import { 
  getFormCookie,
  getUserName,
  getUserPhone,
  getUserEmail
} from '../services/cookieService';
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

export const hideForm = (props) => {
  console.log('[hideForm]');
  const { setState } = props;
  setState({ formVisible: false });
  var formInputs = document.getElementsByClassName('orcamento-inputs');
  for(var i = 0; i < orcamentoInputs.length; i++){
    formInputs[i].style.display = 'none';
  }
  return props;
}

export const showError = (id) => {
  var email = document.getElementById(id);
  email.style.display = 'contents';

  setTimeout(() => {
    hideError(id)
  }, 3000);
}

export function loadUserFormData(props) {
  console.log('[loadUserFormData]');

  var userName = getUserName();
  if (!userName) {
    console.log('user name not found');
    return props;
  }
  var userPhone = getUserPhone();
  if (!userPhone) {
    console.log('user phone not found');
    return props;
  }
  var userEmail = getUserEmail();
  if (!userEmail){
    console.log('user email not found');
    return props;
  }

  document.getElementById('name').value = userName;
  document.getElementById('phone').value = userPhone;
  document.getElementById('email').value = userEmail;
  return props;
}

export const loadFormEvents = (props) => {
  console.log('[loadFormEvents]');
  var hasFormCookie = getFormCookie();
  if (hasFormCookie && hasFormCookie === 'true') {
    console.log('[loadFormEvents] formcookie', hasFormCookie);
    hideForm(props);
    loadUserFormData(props);
  }
  loadEvents(props);
  return props;
}