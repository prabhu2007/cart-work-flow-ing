/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { setCart } from './actions/cart.js';

const CART_LOCAL_STORAGE_KEY = 'shop-cart-data';

function getLocalCartData() {
  const localCartData = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  try {
    return JSON.parse(localCartData) || {};
  } catch (e) {
    return {};
  }
}

export function installCart(store) {
  function handleStorageEvent(event) {
    if (event == null || document.hidden) {
      store.dispatch(setCart(getLocalCartData()));
    }
  }
  window.addEventListener('storage', handleStorageEvent);
  handleStorageEvent();

  store.subscribe(() => {
    const state = store.getState();
    // Setting localStorage does not cause another storage event on same window.
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state.cart));
  });
}
