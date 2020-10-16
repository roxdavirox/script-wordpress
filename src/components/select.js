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

  let selectChildren = div.children[0].children[0].children[1]

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
  const itemsId = getItemsId(optionId);
  const dataRequest = {
    optionId,
    selectedItemId,
    prevItem,
    itemsId,
    defaultItems
  };

  const response = await getUpdatedComponent(dataRequest);
  await updatePrice(props);
  pipe(props)
    .then(loadItemSelectEvents)
    .then(loadInputEvents);

  return {
    ...props,
    html: response.html
  }
}

