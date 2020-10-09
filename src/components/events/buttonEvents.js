import { emailIsValid, nameIsValid, phoneIsValid} from '../../utils/validations';
import { hideForm, hideRequiredText, showError, setUserFormData, updatePrice } from '../form';
import { compose } from '../../utils/compose';

export const loadButtonEvents = (props) => {
  console.log('[loadButtonEvents]');
  var button = document.getElementById('ver-preco-button');
  if (button) {
    button.onclick = function onClick(e) {
      e.preventDefault();
      const { setState, getState } = props;
      console.log('[onButtonClick]');
      setState({ erro: false });
      if (!emailIsValid()){
        console.log('email invalido');
        showError('email-error');
        setState({ erro: true });
      }
      if (!nameIsValid()) {
        console.log('nome invalido');
        showError('name-error');
        setState({ erro: true });
      }
      if (!phoneIsValid()){
        console.log('telefone invalido');
        showError('phone-error');
        setState({ erro: true });
      }
      const { erro } = getState();
      if (erro) return;

      const fns = [
        hideRequiredText,
        hideForm,
        setUserFormData,
        updatePrice
      ].reverse();

      compose(fns)(props);

      window.scrollTo(0, 0);
    }
  }
}