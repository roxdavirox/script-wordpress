import { post } from './api';
import { getFormDataRequest } from '../components/form';
import { getCurrentUrl } from '../utils/dom';

export const getHtmlForm = async (props) => {
  console.log('[getHtmlForm]');
  const { getState } = props;
  const { json } = getState();
  const { productId, ...dataRequest } = json

  const response = await post(`/form/${productId}`)(dataRequest)
  console.log('[getHtmlForm] response', response);
  return {
    ...props,
    html: response.html
  }
}

export const getPrice = async (props) => {
  console.log('[getPrice]');
  const { getState } = props;
  const { json } = getState();
  const { defaultItems } = json;
  const { formDataRequest } = getFormDataRequest(props);
  const url = getCurrentUrl();
  const data = {
    defaultItems,
    url,
    ...formDataRequest
  }
  const response = await post(`/form/quote`)(data);
  console.log('[getPrice] response', response);
  return {
    ...props,
    quote: response
  }
}