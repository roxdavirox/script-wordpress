import { clearPhone, formatPhone } from '../../utils/phone';

export const loadPhoneEvents = () => {
  console.log('[loadPhoneEvents]');
  const inputPhone = document.getElementById('phone');

  inputPhone.onkeypress = function onkeypress(e) {
    console.log('[inputPhone.onkeypress]');
    var v = '';
    v = clearPhone(e.target.value);
    if ((v +e.key).length > 15) return;
    console.log('targetvalue', e.target.value);
    console.log('v', v);
    var mask = v.length >= 10 ? '(##) #####-####' : '(##) ####-####';
    console.log('mask', mask);
    
    inputPhone.value = formatPhone(v, mask);
  }

  inputPhone.onkeyup = function onKeyUp(e) {
    console.log('[inputPhone.onkeyup]');
    var v = '';
    console.log('onkeyup', e.key);
    v = clearPhone(e.target.value);
    console.log('targetvalue', e.target.value);
    console.log('v', v);
    if (v.length <= 10) {
      console.log('v length', v.length);
      inputPhone.value = formatPhone(v, '(##) ####-####');
    }
  }
}