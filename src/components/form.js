import { 
  getFormCookie,
  getUserName,
  getUserPhone,
  getUserEmail,

  setUserName,
  setUserPhone,
  setUserEmail,
  setFormCookie
} from '../services/cookieService';
import { loadEvents } from './events/formEvents';
import { formatPrice } from '../utils/price';
import { getPrice } from '../services/formService';

export const getJsonRequest = (props) => {
  console.log('[getJsonRequest] props', props);
  const { document, setState } = props;
  const [json] = document.getElementsByClassName('sku');
  const { innerText } = json;
  const jsonData = JSON.parse(innerText);
  setState({ json: jsonData });
  return props;
}

export const getFormDataRequest = props => {
  const quantity = document.getElementById('quantity-select').value;
  const productName = document.getElementsByClassName('product_title entry-title elementor-heading-title elementor-size-default')[0].innerText;
  const sizeSelect = document.getElementById('size-select');

  if(sizeSelect) {
    var size = JSON.parse(sizeSelect.children[sizeSelect.selectedIndex].getAttribute('_size'));
  }

  const items = document.getElementsByClassName('item-select');
  var itemsId = [];
  for(var i = 0; i < items.length; i++) {
    itemsId.push(items[i].children[items[i].selectedIndex].getAttribute('_itemid'));
  }
  
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var person = {
    name,
    email,
    phone
  };
  
  console.log('quantity', quantity)
  console.log('size', size);
  console.log('itemsId', itemsId);

  const formDataRequest = { quantity, size, itemsId, person, productName };
  console.log('formDataRequest', formDataRequest);
  return {
    ...props,
    formDataRequest
  };
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
  for(var i = 0; i < formInputs.length; i++){
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

export const setUserFormData = props => {
  console.log('[setUserFormData]');
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  setUserName(name);
  setUserPhone(phone);
  setUserEmail(email);
  setFormCookie(true);
  return props;
}

export const updatePrice = async props => {
  console.log('[updatePrice]');
  const { quote } = await getPrice(props);
  const { setState } = props;
  setState({
    totalPrice: quote.price,
    unitPrice: quote.unitPrice
  });
  const total = formatPrice(quote.price);
  const unitPrice = formatPrice(quote.unitPrice);
  document.getElementsByClassName('elementor-widget-woocommerce-product-price')[0]
    .children[0]
    .children[0]
    .innerText = `${total} (${unitPrice}/unit)`;
  return props;
}

export const clearPrice = props => {
  document.getElementsByClassName('elementor-widget-woocommerce-product-price')[0]
    .children[0]
    .children[0]
    .innerText = `Calculando...`;
  return props;
}