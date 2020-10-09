export function getDivByOptionId(optionId) {
  console.log('[getDivByOptionId]');
  var containers = document.querySelectorAll('[id=item-container]');
  console.log('[getDivByOptionId] containers', containers);
  for(var i = 0; i < containers.length; i++) {
    if (containers[i].getAttribute('_optionid') === optionId) {
      console.log('[getDivByOptionId] container selecionado', containers[i]);
      return containers[i];
    }
  }
  return false;
}