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
  const items =  document.getElementsByClassName('item-select');
  if(!items) return props;
  const { setState, getState } = props;

  for(var i = 0; i < items.length; i++) {
    items[i].onchange = async function onChange(e) {
      await onItemChange(props)(e);
    }
    const optionId = items[i].id;
    const selectedItem = items[i].children[items[i].selectedIndex];
    const itemId = selectedItem.getAttribute('_itemid');
    const div = getDivByOptionId(optionId);

    let label = '';
    const hasUnitField = div.children[0].children[1];
    let x = 1;
    let y = 1;
    let quantity = 1;
    if (hasUnitField) { 
      label = div.children[0].children[1].children[0].innerText;

      let isSizeType = div.children[0].children[1].children[1].children[1] !== undefined;
      if (isSizeType) {
        x = div.children[0].children[1].children[1].children[0].children[0].value
        y = div.children[0].children[1].children[1].children[1].children[0].value
      } else {
        quantity = div.children[0].children[1].children[1].value
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
      ...defaultItems
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