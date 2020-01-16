import { CART_LOADED, ADD_TO_CART } from '../actions/cart';

function cartReducer(state = { items: {} }, action) {
  switch (action.type) {
    case CART_LOADED:
    case ADD_TO_CART:
      return {
        ...state,
        id: action.cartId,
        items: action.cartItems,
      };
    default:
      return state;
  }
}

export default cartReducer;
