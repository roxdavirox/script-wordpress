export const formatPrice = price =>
  parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
