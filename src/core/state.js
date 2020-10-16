

// cria um estado para ser acessado por todos os components
// só é possivel ter essa fonte de dados e precisa ser atualizada sempre com a função setState
const INITIAL_STATE = {
  formVisible: true,
  unitPrice: 0,
  totalPrice: 0,
  erro: false,
  selectedItems: {}
};

export const createState = (initialState = INITIAL_STATE) => {
  const store = {
    state: initialState
  };
  
  const change = () => props => {
    store.state = {
      ...store.state,
      ...props
    }
  }
  
  const getState = () => store.state;

  const setState = change();
  
  return {
    getState,
    setState
  };
}
