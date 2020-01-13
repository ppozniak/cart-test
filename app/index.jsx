import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import CartPage from './container/CartPage';
import store from './store';

render(
    <Provider store={store}>
        <CartPage />
    </Provider>,
    document.querySelector('.app')
);
