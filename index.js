function getDataRequest() {
  var quantity = document.getElementById('quantity-select').value;
  var productName = document.getElementsByClassName('product_title entry-title elementor-heading-title elementor-size-default')[0].innerText;
  var sizeSelect = document.getElementById('size-select');

  if(sizeSelect) {
    var size = JSON.parse(sizeSelect.children[sizeSelect.selectedIndex].getAttribute('_size'));
  }

  var items = document.getElementsByClassName('item-select');
  var itemsId = [];
  for(var i = 0; i < docs.length; i++) {
    itemsId.push(items[i].children[items[i].selectedIndex].id);
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

  return { quantity, size, itemsId, person, productName };
}

function updatePriceRequest() {
  var theUrl = 'https://mktp.herokuapp.com/form/quote';
  let data = getDataRequest();
  axios({ 
    method: 'POST', 
    url: theUrl, 
    data 
  })
  .then(res => {
    console.log(res);
    return res;
  })
  .then(res => {
    var total = res.data.price;
    state.totalPrice = total;
    state.unitPrice = res.data.unitPrice;
    var _total = parseFloat(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    var _unitPrice = parseFloat(state.unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementsByClassName('elementor-widget-woocommerce-product-price')[0].children[0].children[0].innerText = `${_total} (${_unitPrice}/unit)`;
  });
}

function setCookie(name, value) {
  var cookie = name + "=" + escape(value);
  document.cookie = cookie;
}

function getCookie(name) {
  var cookies = document.cookie;
  var prefix = name + "=";
  var begin = cookies.indexOf("; " + prefix);

  if (begin == -1) {

      begin = cookies.indexOf(prefix);
       
      if (begin != 0) {
          return null;
      }

  } else {
      begin += 2;
  }

  var end = cookies.indexOf(";", begin);
   
  if (end == -1) {
      end = cookies.length;                        
  }

  return unescape(cookies.substring(begin + prefix.length, end));
}

function formata(value, mask) {
  var _value = value;
  var _mask = mask;
  var _newValue = '';

  for (var c = 0, i = 0; i < _value.length; c++) {
      if(_mask.charAt(c) == ' ') {
          _newValue += ' ';
      } else if (mask.charAt(c) == '-') {
          _newValue += '-';
      } else if (mask.charAt(c) == '(') {
          _newValue += '(';
      } else if (mask.charAt(c) == ')') {
          _newValue += ')';
      } else {
          _newValue += _value.charAt(i);
          i++;
      }
  }
  return _newValue;
}

function clearPrice() {
  document.getElementsByClassName('elementor-widget-woocommerce-product-price')[0].children[0].children[0].innerText = `Calculando...`;
}

function hideForm() {
  state = { formVisible: false }
  
  var orcamentoInputs = document.getElementsByClassName('orcamento-inputs');
  for(var i = 0; i < orcamentoInputs.length; i++){
    orcamentoInputs[i].style.display = 'none';
  }
}

function updatePriceEvent(e) {
  e.preventDefault();
  if (state.formVisible) return;
  clearPrice();
  updatePriceRequest();
}

function getDivByOptionId(optionId) {
  var divs = document.querySelectorAll('[_optionid]');
  
  for(var i = 0; i < divs.length; i++) {
    if (divs[i].getAttribute('_optionid') === optionId) 
      return divs[i];
  }
  return false;
}

function getUpdatedComponent(divElement, optionId, selectedItemId) {
  console.log('divElement', divElement);
  let selectChildren = divElement.children[1].children[0].children[0];
  console.log('selectChildren', selectChildren);
  var itemsId = [];
  for(var i = 0; i < selectChildren.children.length; i++) {
    itemsId.push(selectChildren.children[i].getAttribute('id'))
  }
  let json = JSON.parse(document.getElementsByClassName('sku')[0].innerText);
  let { defaultItems, ...rest } = json;
  var data = {
    optionId,
    selectedItemId,
    itemsId,
    defaultItems
  };
  let url = `http://localhost:3001/form/select`;
	return axios({ 
    method: 'POST', 
    url, 
    data
  });
}

function updateForm(e) {
  e.preventDefault();
  // if (state.formVisible) return;
  var unit = e.target.children[e.target.selectedIndex].getAttribute('_unit');
  var showUnitField = e.target.children[e.target.selectedIndex].getAttribute('_showunitfield');
  var optionId = e.target.children[e.target.selectedIndex].getAttribute('_optionid');
  var selectedItemId = e.target.children[e.target.selectedIndex].getAttribute('id');
  console.log('selectedItemId', selectedItemId);
  console.log('showUnitField', showUnitField);
  
  console.log('unit', unit);
  let selectedDiv = getDivByOptionId(optionId);
  getUpdatedComponent(selectedDiv, optionId, selectedItemId)
    .then(res => res.data.html)
    .then(html => selectedDiv.innerHTML = html)
    .then(() => {
      selectedDiv.onchange = e => {
      updateForm(e);
      updatePriceEvent(e);
    }})
    .then(() => console.log('component response'));
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function emailIsValid() {
  var email = document.getElementById('email').value;
  return validateEmail(email);
}

function showError(id) {
  var email = document.getElementById(id);
  email.style.display = 'contents';

  setTimeout(() => {
    hideError(id)
  }, 3000);
}

function hideError(id) {
  var email = document.getElementById(id);
  email.style.display = 'none';
}

function validatePhone(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function clearPhone(phone) {
  var v = phone;
  v = v.replace('(', '');
  v = v.replace(')', '');
  v = v.replace('-', '');
  v = v.replace(' ', '');
  return v.length ? v : '';
}

function nameIsValid() {
  var name = document.getElementById('name').value;
  return name.length > 1;
}

function phoneIsValid() {
  var phone = document.getElementById('phone').value;
  return phone.length >= 10;
}

function loadUserFormData() {
  var userName = getCookie('user-name');
  if (!userName) {
    console.log('user name not found');
    return;
  }
  var userPhone = getCookie('user-phone');
  if (!userPhone) {
    console.log('user phone not found');
    return;
  }
  var userEmail = getCookie('user-email');
  if (!userEmail){
    console.log('user email not found');
    return;
  }

  document.getElementById('name').value = userName;
  document.getElementById('phone').value = userPhone;
  document.getElementById('email').value = userEmail;
  console.log('dados do usuario carregados');
}

function setUserFormData() {
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  setCookie('user-name', name);
  setCookie('user-phone', phone);
  setCookie('user-email', email);
  setCookie('formCookie', true);
}

function debounce(fn, waitFor) {
  let timeout;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, waitFor);
  }
}

function loadFormEvents() {
  // verificar se ja tem cookie
  var hasFormCookie = getCookie('formCookie');
  if (hasFormCookie && hasFormCookie === 'true') {
    console.log('formcookie', hasFormCookie);
    hideForm();
    loadUserFormData();
  }
  var phone = document.getElementById('phone');
  
  phone.onkeypress = function(e) {
    var v = '';
    v = clearPhone(e.target.value);
    if ((v +e.key).length > 15) return;
    console.log('targetvalue', e.target.value);
    console.log('v', v);
    var mask = v.length >= 10 ? '(##) #####-####' : '(##) ####-####';
    console.log('mask', mask);
    
    phone.value = formata(v, mask);
  }

  phone.onkeyup = function(e) {
    var v = '';
    console.log('onkeyup', e.key);
    v = clearPhone(e.target.value);
    console.log('targetvalue', e.target.value);
    console.log('v', v);
    if (v.length <= 10) {
      console.log('v length', v.length);
      phone.value = formata(v, '(##) ####-####');
    }
  }
 
  var button = document.getElementById('ver-preco-button');
  if (button) {
    button.onclick = function(e) {
      e.preventDefault();
      var erro = false;
      if (!emailIsValid()){
        console.log('email invalido');
        showError('email-error');
        erro = true;
      }
      if (!nameIsValid()) {
        console.log('nome invalido');
        showError('name-error');
        erro = true;
      }
      if (!phoneIsValid()){
        console.log('telefone invalido');
        showError('phone-error');
        error = true;
      }
      if (erro) return;
      hideForm();
      setUserFormData();
      updatePriceRequest();
      window.scrollTo(0, 0);
      console.log('atualizar preço');
    }
  }

  var quantity = document.getElementById('quantity-select');
  if (quantity) {
    let debounceUpdatePrice = debounce(() => {       
      if (state.formVisible) return;
      clearPrice();
      updatePriceRequest(); 
    }, 450);

    quantity.onchange = debounceUpdatePrice;
  }

  var size = document.getElementById('size-select');
  if (size) {
    size.onchange = updatePriceEvent;
  }

  var items =  document.getElementsByClassName('item-select');
  if(!items) return;

  for(var i = 0; i < items.length; i++) {
    items[i].onchange = e => {
      updateForm(e);
      updatePriceEvent(e);
    };
  }
}

function setFormHTML(data) {
	document.getElementById('form-container').innerHTML = data.html;
	return data;
}

function loadForm() {
  let json = JSON.parse(document.getElementsByClassName('sku')[0].innerText);
  let { productId, ...data } = json;
  let url = `http://localhost:3001/form/${productId}`;
	axios({ 
      method: 'POST', 
      url, 
      data
		})
		.then(res => {
			console.log(res);
			return res;
		})
		.then(res => res.data)
		.then(setFormHTML)
		.then(loadFormEvents);
}
var state = { formVisible: true, unitPrice: 0, totalPrice: 0 }
loadForm()
