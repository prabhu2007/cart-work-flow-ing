import { PageViewElement } from './page-view-element.js';
import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { shopButtonStyle } from './shop-button-style.js';
import { shopCommonStyle } from './shop-common-style.js';
import { shopFormStyle } from './shop-form-style.js';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

class ShopCart extends connect(store)(PageViewElement) {
  render() {
    const cartList = this._cart || [];
    const basketSummary = this._basketSummary;
    const stepListItems = [
      { name: 'Basket', progress: 'done' },
      { name: 'Delivery', progress: '' },
      { name: 'Payment', progress: '' },
      { name: 'Confirmation', progress: '' },
    ];
    return html` ${shopButtonStyle} ${shopCommonStyle} ${shopFormStyle}
      <style>
        .list {
          margin: 40px 0;
        }

        .checkout-box {
          font-weight: bold;
          text-align: right;
          margin-right: 10px;
        }

        .subtotal {
          margin: 0 86px 0 24px;
        }

        @media (max-width: 767px) {
          .subtotal {
            margin: 0 0 0 24px;
          }
        }
      </style>

      <div class="main-frame">
        <div class="subsection">
          ${cartList.length > 0
            ? html`
                <progress-step
                  .stepListItems="${stepListItems}"
                ></progress-step>
                <header>
                  <h1>Your Cart</h1>
                  <span
                    >${`(${cartList.length} item${
                      cartList.length > 1 ? 's' : ''
                    })`}</span
                  >
                </header>
                <div class="list">
                  ${repeat(
                    cartList,
                    (entry) => html`
                      <shop-cart-item .entry="${entry}"></shop-cart-item>
                    `,
                  )}
                </div>
                <div class="checkout-box">
                  Total:
                  <span class="subtotal"
                    >$${basketSummary.price.toFixed(2)}</span
                  >
                </div>
                <cart-button-controls> </cart-button-controls>
              `
            : html`
                <p class="empty-cart">
                  Your <iron-icon icon="shopping-cart"></iron-icon> is empty.
                </p>
              `}
        </div>
      </div>`;
  }

  static get properties() {
    return {
      _basketSummary: { type: Object },

      _cart: { type: Array },
    };
  }

  stateChanged(state) {
    this._cart = state.cart.basket;
    this._basketSummary = state.cart.basketSummary;
  }
}

customElements.define('shop-cart', ShopCart);
