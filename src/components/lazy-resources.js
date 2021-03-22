// shop-app
import '@polymer/paper-icon-button';
import '@polymer/app-layout/app-drawer/app-drawer.js';

// shop-list
// shop-detail
import './shop-404.js';

// shop-cart
import './shop-cart-item.js';

import './progress-step.js';
import './cart-button-controls.js';
import './main.js';

// shop-checkout
import '@polymer/paper-spinner/paper-spinner-lite.js';

import { store } from '../store.js';
import { installCart } from '../cart.js';
import cart from '../reducers/cart.js';

store.addReducers({
  cart,
});
installCart(store);
