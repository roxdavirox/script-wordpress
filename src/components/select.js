import { getUpdatedComponent } from '../services/selectService';
import { getDivByOptionId } from '../utils/dom';

export const getItemsId = (optionId) => {
  console.log('[getItemsId]');
  const div = getDivByOptionId(optionId);
  console.log('[getItemsId] div', div);

  let selectChildren = div.children[0].children[0].children[1]

  const itemsId = [];
  for(var i = 0; i < selectChildren.children.length; i++) {
    itemsId.push(selectChildren.children[i].getAttribute('id'));
  }

  return itemsId
}

export const updateComponent = props => async (optionId, selectedItemId) => {
  console.log('[updateComponent]');
  const { getState } = props;
  const { defaultItems } = getState();
  const itemsId = getItemsId(optionId);
  const dataRequest = {
    optionId,
    selectedItemId,
    itemsId,
    defaultItems
  };
  const response = await getUpdatedComponent(dataRequest);
  return {
    ...props,
    html: response.html
  }
}

