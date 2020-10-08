import { debounce } from '../../utils/debounce';
import { updatePrice, clearPrice } from '../form';

export const loadQuantityEvents = props => {
  console.log('[loadQuantityEvents]');
  const quantity = document.getElementById('quantity-select');
  if (!quantity) return;

  quantity.onchange = debounce(() => {
    const { getState } = props;
    const { formVisible } = getState();
    if (formVisible) return;
    clearPrice(props);
    updatePrice(props);
  }, 450);
}