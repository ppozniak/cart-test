import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProductList, CartList } from '../components';

import * as cartActions from '../actions/cart';

export class CartPage extends Component {
  constructor(props) {
    super(props);
    props.loadCart();
  }

  render() {
    const { isLoading, products, cart, addToCart } = this.props;

    if (isLoading) {
      return <div> Loading your cart </div>;
    }

    return (
      <div className="container">
        <header className="mt-5 mb-5">
          <h1>Shopping Cart</h1>
        </header>
        <main className="row">
          <section className="col">
            <ProductList products={products} addToCart={addToCart} />
          </section>
          <section className="col">{cart && <CartList products={products} cart={cart} />}</section>
        </main>
      </div>
    );
  }
}

export function mapStateToProps({ cart, products }) {
  return {
    isLoading: !cart.id,
    products,
    cart,
  };
}

export default connect(mapStateToProps, cartActions)(CartPage);
