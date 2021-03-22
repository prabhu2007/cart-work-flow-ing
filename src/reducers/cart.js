import { SET_CART } from '../actions/cart.js';
import { createSelector } from 'reselect';

const cart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        ...action.cart,
      };
    default:
      return state;
  }
};

export default cart;
