import { LitElement, html } from 'lit-element';
import { shopButtonStyle } from './shop-button-style.js';
import { LionButton } from '@lion/button';

class cartButtonControls extends LitElement {
  render() {
    return html` ${shopButtonStyle}
      <style>
        :host {
          display: block;
          text-align: right;
          padding-top: 20px;
          color: var(--app-secondary-color);
        }
      </style>

      <shop-button>
        <a href="/">Next</a>
      </shop-button>

      <lion-button>Default</lion-button>`;
  }
}

customElements.define('cart-button-controls', cartButtonControls);
