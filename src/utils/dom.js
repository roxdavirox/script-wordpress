export function getDivByOptionId(optionId) {
  console.log('[getDivByOptionId]');
  var divs = document.querySelectorAll('[_optionid]');
  
  for(var i = 0; i < divs.length; i++) {
    if (divs[i].getAttribute('_optionid') === optionId) 
      return divs[i];
  }
  return false;
}