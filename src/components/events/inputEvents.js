import { updatePrice, clearPrice } from "../form";

export const loadInputEvents = props => {
  console.log('[loadInputEvents]');
  const inputQuantityList = document.querySelectorAll('[id=input-unit-quantity]');
  console.log('[loadInputEvents]', inputQuantityList);

  for(var i = 0; i < inputQuantityList.length; i++) {
    inputQuantityList[i].onchange = function onChange(e) {
      console.log('[loadInputEvents] onchange');
      if (!e.target) return;
      let itemId = e.target.getAttribute('_itemid');
      const { setState, getState } = props;
      const state = getState();
      const { json } = state;
      const newJson = { ...json, defaultItems: { 
          ...json.defaultItems,
          [itemId]: {
            ...json.defaultItems[itemId],
            quantity: e.target.value
          }
        }
      };
      setState({ json: newJson });
      console.log('state', state);
      clearPrice(props);
      updatePrice(props);
    }
  }

  var inputSizeXList = document.querySelectorAll('[id=input-unit-x]');
  for(var i = 0; i < inputSizeXList.length; i++) {
    inputSizeXList[i].onchange = e => {
      console.log('[loadInputEvents] onchange');
      if (!e.target) return;

      const { setState, getState } = props;
      const state = getState();
      const { json } = state;
      let itemId = e.target.getAttribute('_itemid');

      const newJson = { ...json, defaultItems: { 
          ...json.defaultItems,
          [itemId]: {
            ...json.defaultItems[itemId],
            x: e.target.value
          }
        }
      };

      setState({ json: newJson });
      clearPrice(props);
      updatePrice(props);
    }
  }

  var inputSizeYList = document.querySelectorAll('[id=input-unit-y]');
  for(var i = 0; i < inputSizeYList.length; i++) {
    inputSizeYList[i].onchange = e => {
      if (!e.target) return;

      const { setState, getState } = props;
      const state = getState();
      const { json } = state;
      let itemId = e.target.getAttribute('_itemid');

      const newJson = { ...json, defaultItems: { 
          ...json.defaultItems,
          [itemId]: {
            ...json.defaultItems[itemId],
            y: e.target.value
          }
        }
      };

      setState({ json: newJson });
      updatePrice(props);
    }
  }

  return props;
}