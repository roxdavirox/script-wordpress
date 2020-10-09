import { getDivByOptionId } from '../../utils/dom';
import { updateComponent } from '../select';

export const onItemChange = props => async e => {
  e.preventDefault();
  console.log('[onItemChange]');
  if (e.target.className !== 'item-select') {
    console.log('evento chamado por outro elemento != item-select');
    return;
  }

  // const unit = e.target.children[e.target.selectedIndex].getAttribute('_unit');
  // const showUnitField = e.target.children[e.target.selectedIndex].getAttribute('_showunitfield');
  const { children, selectedIndex } = e.target;
  const child = children[selectedIndex];
  const selectedItemId = child.getAttribute('id');
  const optionId = child.getAttribute('_optionid');

  const { html } = await updateComponent(props)(optionId, selectedItemId);
  const div = getDivByOptionId(optionId);
  div.innerHTML = html;
}

export const loadItemSelectEvents = props => {
  console.log('[loadItemSelectEvents]');
  const items =  document.getElementsByClassName('item-select');
  if(!items) return;

  for(var i = 0; i < items.length; i++) {
    items[i].onchange = e => onItemChange(props)(e);
  }
}