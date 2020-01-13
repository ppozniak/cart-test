export const CART_LOADING = 'CART_LOADING';
export const CART_LOADED = 'CART_LOADED';

export function loadCart() {
    return async (dispatch, _, config) => {
        dispatch({ type: CART_LOADING });

        const response = await fetch(config.cartApi, { method: 'POST', body: JSON.stringify({}) });
        const cart = await response.json();

        dispatch({
            type: CART_LOADED,
            ...cart,
        })
    };
}
