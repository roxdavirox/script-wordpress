import { updatePrice, clearPrice } from '../form';
import { debounce } from '../../utils/debounce';

export const loadSizeEvents = props => {
  const size = document.getElementById('size-select');
  if (!size) return;

  size.onchange = debounce(() => {
    const { getState } = props;
    const { formVisible } = getState();
    if (formVisible) return;
    clearPrice(props);
    updatePrice(props);
  });
}