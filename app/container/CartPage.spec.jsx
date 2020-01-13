import React from 'react';
import { shallow } from 'enzyme';

import { CartPage, mapStateToProps } from './CartPage';

describe('<CartPage />', () => {

    const cart = [];
    const products = [];

    it('should start loading the cart when the cart page gets created', () => {
        // Given
        const loadCart = jest.fn();

        // When
        const props = { cart, products, loadCart };
        const render = shallow(<CartPage {...props} />);

        // Then
        expect(loadCart).toHaveBeenCalled();
    });

    it('should display a loading message when loading the cart', () => {
        // Given
        const loadCart = jest.fn();
        const isLoading = true;

        // When
        const props = { cart, products, isLoading, loadCart };
        const render = shallow(<CartPage {...props} />);

        // Then
        expect(render.find('div').text()).toContain('Loading your cart');
    });

});
