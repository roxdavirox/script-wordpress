// let API_URL = 'http://localhost:3001';
let API_URL = 'https://mktp.herokuapp.com';
export const post = url => data => axios({ 
  method: 'POST', 
  url: `${API_URL}${url}`, 
  data
})
  .then(res => res.data);
