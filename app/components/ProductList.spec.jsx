import React from 'react';
import { shallow } from 'enzyme';

import ProductList from './ProductList';

describe('<ProductList />', () => {

    it('should render a list of products', () => {
        // Given
        const products = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' }
        ];

        const addToCart = jest.fn();

        // When
        const render = shallow(<ProductList products={products} addToCart={addToCart} />);
        const listItems = render.find('li');
        
        // Then
        expect(listItems).toHaveLength(2);
        expect(listItems.first().find('span').text()).toContain('A');
        expect(listItems.at(1).find('span').text()).toContain('B');
    });

    it('should trigger addToCart with the right productId', () => {
        // Given
        const products = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' }
        ];

        const addToCart = jest.fn();

        // When
        const render = shallow(<ProductList products={products} addToCart={addToCart} />);
        render.find('button').first().simulate('click');

        // Then
        expect(addToCart).toHaveBeenCalledWith(products[0].id);
    });

});
