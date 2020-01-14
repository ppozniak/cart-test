import React from 'react';
import { shallow } from 'enzyme';

import CartList from './CartList';

describe('<CartList />', () => {
  const products = [
    { name: 'Chicken', id: 1, price: 10 },
    { name: 'Kiwi', id: 2, price: 15 },
  ];

  it('should show message if there are no items in cart', () => {
    // Given
    const cart = { items: {}, id: 123 };

    // When
    const render = shallow(<CartList cart={cart} products={[]} />);

    // Then
    expect(render.text()).toBe('Your cart is empty');
  });

  it('should render a list of items', () => {
    // Given
    const cart = {
      items: {
        1: {
          itemId: 1,
          quantity: 2,
        },
        2: {
          itemId: 2,
          quantity: 5,
        },
      },
      id: 123,
    };

    // When
    const render = shallow(<CartList cart={cart} products={products} />);
    const listItems = render.find('li');

    // Then
    expect(listItems).toHaveLength(2);
    expect(listItems.first().text()).toContain('Chicken');
    expect(listItems.at(1).text()).toContain('Kiwi');
  });

  it('should render quantity of products', () => {
    // Given
    const cart = {
      items: {
        1: {
          itemId: 1,
          quantity: 12,
        },
      },
      id: 123,
    };

    // When
    const render = shallow(<CartList cart={cart} products={products} />);
    const item = render.find('li');

    // Then
    expect(item.text()).toContain('12');
  });

  it('should render total price of products', () => {
    // Given
    const cart = {
      items: {
        1: {
          itemId: 1,
          quantity: 5,
        },
      },
      id: 123,
    };

    // When
    const render = shallow(<CartList cart={cart} products={products} />);
    const item = render.find('li');

    // Then
    expect(item.text()).toContain('50 💵');
  });
});
