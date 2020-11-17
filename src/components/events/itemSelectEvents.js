import { getDivByOptionId } from '../../utils/dom';
import { updateComponent } from '../select';
import { loadInputEvents } from './inputEvents';
import { pipe } from '../../utils/pipe';
import { updatePrice } from '../form';

export const onItemChange = props => async e => {
  e.preventDefault();
  console.log('[onItemChange]');
  console.log('[e.target]', e.target);
  const { children, selectedIndex } = e.target;
  const child = children[selectedIndex];
  console.log('[child]', child);
  const selectedItemId = child.getAttribute('_itemid');
  console.log('[selectedItemId]', selectedItemId);
  const optionId = child.getAttribute('_optionid');
  console.log('[optionId]', optionId);
  const { getState } = props;
  const { selectedItems } = getState();
  console.log('[selectedItems]', selectedItems);

  const prevItem = selectedItems[optionId];
  console.log('[prevItem]', prevItem);
  const { html } = await updateComponent(props)(optionId, selectedItemId, prevItem);
  console.log('[html]', html);

  const div = getDivByOptionId(optionId);
  div.innerHTML = html;

  pipe(props)
    .then(loadItemSelectEvents)
    .then(loadInputEvents)
    .then(updatePrice);

}

export const loadItemSelectEvents = props => {
  console.log('[loadItemSelectEvents]');
  const itemsSelect =  document.getElementsByClassName('item-select');
  if(!itemsSelect) return props;
  const { setState, getState } = props;

  for(var i = 0; i < itemsSelect.length; i++) {
    itemsSelect[i].onchange = async function onChange(e) {
      await onItemChange(props)(e);
    }
    const optionId = itemsSelect[i].id;
    const selectedItem = itemsSelect[i].children[itemsSelect[i].selectedIndex];
    const itemId = selectedItem.getAttribute('_itemid');
    const div = getDivByOptionId(optionId);
    console.log('[loadItemSelectEvents] div', div);
    let label = '';
    const hasUnitField = div.children[1] !== undefined && div.children[1].children[0] !== undefined;
    console.log('[hasUnitField]', hasUnitField);
    let x = 1;
    let y = 1;
    let quantity = 1;
    if (hasUnitField) { 
      label = div.children[1].children[0].innerText;
      console.log('[label]', label);

      let isSizeType = div.children[1].children[1].children[1] !== undefined;
      console.log('[size type] ', isSizeType);
      if (isSizeType) {
        x = div.children[1].children[1].children[0].children[0].value
        console.log('[x]', x);
        y = div.children[1].children[1].children[1].children[0].value
        console.log('[y]', y);
      } else {
        quantity = div.children[1].children[1].children[0].value
        console.log('[quantity]', quantity)
      }
    }
    const state = getState();
    const { json } = state;
    
    const defaultItems = {
      ...json.defaultItems,
      [itemId]:  { quantity, x, y, label }
    };
    console.log('defaultItems', defaultItems);

    const updatedJson = {
      ...json,
      defaultItems
    };
    setState({
      selectedItems: {
        ...state.selectedItems,
        [optionId]: { itemId, label, size: { x, y }, quantity }
      },
      json: updatedJson
    });
  }
  return props;
}