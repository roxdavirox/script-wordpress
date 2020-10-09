import { getDivByOptionId } from '../../utils/dom';
import { updateComponent } from '../select';
import { loadInputEvents } from './inputEvents';

export const onItemChange = props => async e => {
  e.preventDefault();
  console.log('[onItemChange]');
  const { children, selectedIndex } = e.target;
  const child = children[selectedIndex];
  const selectedItemId = child.getAttribute('_itemid');
  const optionId = child.getAttribute('_optionid');

  const { html } = await updateComponent(props)(optionId, selectedItemId);
  const div = getDivByOptionId(optionId);
  div.innerHTML = html;
  loadItemSelectEvents(props);
  loadInputEvents(props);
}

export const loadItemSelectEvents = props => {
  console.log('[loadItemSelectEvents]');
  const items =  document.getElementsByClassName('item-select');
  if(!items) return props;

  for(var i = 0; i < items.length; i++) {
    items[i].onchange = async function onChange(e) {
      await onItemChange(props)(e);
    }
  }
  return props;
}