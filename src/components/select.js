import { getUpdatedComponent } from '../services/selectService';
import { getDivByOptionId } from '../utils/dom';
import { loadItemSelectEvents } from './events/itemSelectEvents';
import { loadInputEvents } from './events/inputEvents';
import { updatePrice } from './form';
import { pipe } from '../utils/pipe';

export const getItemsId = (optionId) => {
  console.log('[getItemsId]');
  const div = getDivByOptionId(optionId);
  console.log('[getItemsId] div', div);

  let selectChildren = div.children[0].children[1].children[0];
  console.log('[getItemsId] selectChildren', selectChildren);

  const itemsId = [];
  for(var i = 0; i < selectChildren.children.length; i++) {
    itemsId.push(selectChildren.children[i].getAttribute('_itemid'));
  }

  return itemsId
}

export const updateComponent = props => async (optionId, selectedItemId, prevItem) => {
  console.log('[updateComponent]');
  const { getState } = props;
  const { json: { defaultItems } } = getState();
  console.log('[updateComponent] default items', defaultItems);

  const itemsId = getItemsId(optionId);
  console.log('[updateComponent] itemsId', itemsId);

  const dataRequest = {
    optionId,
    selectedItemId,
    prevItem,
    itemsId,
    defaultItems
  };

  console.log('[updateComponent] dataRequest', dataRequest);

  const response = await getUpdatedComponent(dataRequest);

  return {
    ...props,
    html: response.html
  }
}

