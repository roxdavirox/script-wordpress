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
  const { getState } = props;
  const { selectedItems } = getState();
  const prevItem = selectedItems[optionId];

  const { html } = await updateComponent(props)(optionId, selectedItemId, prevItem);
  const div = getDivByOptionId(optionId);
  div.innerHTML = html;
  loadItemSelectEvents(props);
  loadInputEvents(props);
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
      label = div.children[0].children[0].innerText;
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