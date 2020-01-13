import {
    CART_LOADED,
} from '../actions/cart';

function cartReducer(state={ items: {} }, action) {

    switch(action.type) {
        case CART_LOADED:
            return {
                ...state, 
                id: action.cartId,
                items: action.cartItems,
            }
        default:
            return state;
    }

}

export default cartReducer;
