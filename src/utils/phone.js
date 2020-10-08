export function clearPhone(phone) {
  var v = phone;
  v = v.replace('(', '');
  v = v.replace(')', '');
  v = v.replace('-', '');
  v = v.replace(' ', '');
  return v.length ? v : '';
}

export function formatPhone(value, mask) {
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