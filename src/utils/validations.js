export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function emailIsValid() {
  var email = document.getElementById('email').value;
  return validateEmail(email);
}

export function nameIsValid() {
  var name = document.getElementById('name').value;
  return name.length > 1;
}

export function phoneIsValid() {
  var phone = document.getElementById('phone').value;
  return phone.length >= 10;
}