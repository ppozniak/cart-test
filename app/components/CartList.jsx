import React from 'react';
import PropTypes from 'prop-types';

const CartList = ({ cart, products }) => {
  const items = Object.values(cart.items);
  if (!items.length) return 'Your cart is empty';

  const itemsMapping = items.map(cartItem => {
    const cartItemProduct = products.find(({ id }) => id === cartItem.itemId);

    return {
      ...cartItem,
      name: cartItemProduct.name,
      price: cartItemProduct.price,
    };
  });

  return (
    <div className="mr-4">
      <h2>Cart</h2>
      <ul className="list-group">
        {itemsMapping.map(({ quantity, itemId, name, price }) => (
          <li className="list-group-item d-flex justify-content-between" key={itemId}>
            {name} X {quantity} | Total price: {quantity * price} 💵
          </li>
        ))}
      </ul>
    </div>
  );
};

CartList.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  }),
  products: PropTypes.array.isRequired,
};

export default CartList;
