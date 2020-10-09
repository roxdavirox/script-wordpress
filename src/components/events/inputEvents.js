import { updatePrice } from "../form";

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
            ...json.defaultItems,
            quantity: e.target.value
          }
        }
      };
      setState({ json: newJson });
      console.log('state', state);
      updatePrice(props);
    }
  }
  return props;
}