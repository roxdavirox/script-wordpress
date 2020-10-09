import { post } from '../services/api';

export const getUpdatedComponent = data => {
  console.log('[getUpdatedComponent] data', data); 
  return post('/form/select')(data);
}