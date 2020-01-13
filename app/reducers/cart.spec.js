import * as actions from '../actions/cart';
import cartReducer from './cart';

describe('cartReducer', () => {

    it('should return an empty initial state', () => {
        expect(cartReducer(undefined, {})).toEqual({ items: {} });
    });


    it('should store cart id and cartItems when cart is loaded', () => {
        const action = {
            type: actions.CART_LOADED,
            cartId: 123,
            cartItems: {}
        };

        expect(cartReducer(undefined, action)).toEqual({
            id: 123,
            items: {},
        });
    });

});
