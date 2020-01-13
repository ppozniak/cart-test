import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './cart';


const config = { 'cartApi': '/cart' };
const middlewares = [thunk.withExtraArgument(config)];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {

    describe('loadCart', () => {

        afterEach(() => {
            fetchMock.reset()
            fetchMock.restore()
        });

        it('creates a cart when CART_LOADED is dispatched', async () => {
            // Given
            fetchMock.postOnce('/cart', { body: { cartId: '', items: []}});

            // When
            const store = mockStore({});
            await store.dispatch(actions.loadCart());

            // Then
            expect(store.getActions()).toEqual([
                { type: actions.CART_LOADING },
                { type: actions.CART_LOADED, cartId: '', items: [] },
            ]);
        });

    });

});
