import { post } from './api';

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
