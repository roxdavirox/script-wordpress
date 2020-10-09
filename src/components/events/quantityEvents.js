import { updatePrice, clearPrice } from '../form';

export const loadQuantityEvents = props => {
  console.log('[loadQuantityEvents]');
  var quantity = document.getElementById('quantity-select');
  if (!quantity) return props;

  quantity.onchange = function onChange(e) {
    e.preventDefault();
    console.log('[loadQuantityEvents] onchange');
    console.log('[loadQuantityEvents] props', props);
    const { getState } = props;
    const { formVisible } = getState();
    console.log('[loadQuantityEvents] formVisible', formVisible);
    if (formVisible) return;
    clearPrice(props);
    updatePrice(props);
  }
  return props;
}