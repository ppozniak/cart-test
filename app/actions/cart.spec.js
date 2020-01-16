import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './cart';

const config = { cartApi: '/cart' };
const middlewares = [thunk.withExtraArgument(config)];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('loadCart', () => {
    it('creates a cart when CART_LOADED is dispatched', async () => {
      // Given
      fetchMock.postOnce('/cart', { body: { cartId: '', items: {} } });

      // When
      const store = mockStore({});
      await store.dispatch(actions.loadCart());

      // Then
      expect(store.getActions()).toEqual([
        { type: actions.CART_LOADING },
        { type: actions.CART_LOADED, cartId: '', items: {} },
      ]);
    });
  });

  describe('addToCart', () => {
    it('should default to quantity of 1', async () => {
      // Given
      const cartId = 123;
      const currentCart = {
        id: cartId,
        items: {},
      };
      const itemId = 1;
      fetchMock.postOnce(`/cart/${cartId}/item/${itemId}`, {
        body: { cartId, items: { [itemId]: { itemId, quantity: 1 } } },
      });

      // When
      const store = mockStore({
        cart: currentCart,
      });
      await store.dispatch(actions.addToCart(itemId));

      // Then
      const expectedCart = { cartId: currentCart.id, items: { 1: { quantity: 1, itemId: 1 } } };
      expect(store.getActions()).toEqual([{ type: actions.ADD_TO_CART, ...expectedCart }]);
    });

    it('should increase quantity if product is in cart already', async () => {
      // Given
      const cartId = 123;
      const itemId = 1;
      const currentCart = {
        id: cartId,
        items: {
          [itemId]: {
            quantity: 5,
          },
        },
      };

      fetchMock.postOnce(`/cart/${cartId}/item/${itemId}`, (url, opts) => {
        const requestBody = JSON.parse(opts.body);
        const { quantity } = requestBody;

        expect(quantity).toBe(6); // Test if proper quantity is passed to the server
        return { cartId, items: { [itemId]: { itemId, quantity } } };
      });

      // When
      const store = mockStore({
        cart: currentCart,
      });
      await store.dispatch(actions.addToCart(itemId));

      // Then
      const expectedCart = { cartId: currentCart.id, items: { 1: { quantity: 6, itemId: 1 } } };
      expect(store.getActions()).toEqual([{ type: actions.ADD_TO_CART, ...expectedCart }]);
    });
  });
});
