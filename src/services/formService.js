import { post } from './api';
import { getFormDataRequest } from '../components/form';

export const getHtmlForm = async (props) => {
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
  const { getState } = props;
  const { json } = getState();
  const { defaultItems } = json;
  const { formDataRequest } = getFormDataRequest(props);
  const data = {
    defaultItems, 
    ...formDataRequest
  }
  const response = await post(`/form/quote`)(data);
  console.log('[getPrice] response', response);
  return {
    ...props,
    quote: response
  }
}