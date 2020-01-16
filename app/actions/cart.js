import { fetchData } from '../utils';

export const CART_LOADING = 'CART_LOADING';
export const CART_LOADED = 'CART_LOADED';
export const ADD_TO_CART = 'ADD_TO_CART';

export function loadCart() {
  return async (dispatch, _, config) => {
    dispatch({ type: CART_LOADING });

    const cart = await fetchData({ method: 'POST', config });

    dispatch({
      type: CART_LOADED,
      ...cart,
    });
  };
}

export function addToCart(itemId) {
  return async (dispatch, getState, config) => {
    const { cart } = getState();
    const { id } = cart;
    const itemInCart = cart.items[itemId];
    let quantity = 1;

    if (itemInCart) {
      quantity += itemInCart.quantity;
    }

    const newCart = await fetchData({
      method: 'POST',
      path: `/${id}/item/${itemId}`,
      body: {
        quantity,
      },
      config,
    });

    dispatch({ type: ADD_TO_CART, ...newCart });
  };
}
