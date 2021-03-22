import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

import { store } from '../store.js';
import { updateLocation } from '../actions/app.js';

class ShopApp extends connect(store)(LitElement) {
  render() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          padding-top: 100px;
          padding-bottom: 64px;
          min-height: 100vh;
          --app-primary-color: #202020;
          --app-secondary-color: #757575;
          --app-accent-color: #172c50;
          --paper-button-ink-color: var(--app-accent-color);
          --paper-icon-button-ink-color: var(--app-accent-color);
          --paper-spinner-color: var(--app-accent-color);
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          color: var(--app-primary-color);
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.95);
          --app-header-shadow: {
            box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.2);
            height: 10px;
            bottom: -10px;
          }
        }

        paper-icon-button {
          color: var(--app-primary-color);
        }

        .logo {
          text-align: center;
        }

        .logo a {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: var(--app-primary-color);
          text-decoration: none;
          /* required for IE 11, so this <a> can receive pointer events */
          display: inline-block;
          pointer-events: auto;
        }

        .left-bar-item {
          width: 40px;
        }

        main {
          max-width: 1440px;
          margin: 0 auto;
        }

        main > * {
          display: none;
        }

        main > [active] {
          display: block;
        }

        /* small screen */
        @media (max-width: 767px) {
          :host {
            padding-top: 64px;
          }
        }
      </style>

      <app-header
        role="navigation"
        id="header"
        effects="waterfall"
        condenses
        reveals
      >
        <app-toolbar>
          <div class="logo" main-title>
            <a href="/" aria-label="SHOP Home">SHOP CHECK OUT </a>
          </div>
        </app-toolbar>
      </app-header>

      <main>
        <!-- cart view -->
        <shop-cart ?active="${this._page === 'cart'}"></shop-cart>

        <shop-404-warning ?active="${this._page === '404'}"></shop-404-warning>
      </main>
    `;
  }

  static get properties() {
    return {
      _page: { type: String },

      _meta: { type: Object },

      _modalOpened: { type: Object },

      _categories: { type: Object },

      _categoryName: { type: String },

      _lazyResourcesLoaded: { type: Boolean },

      _smallScreen: { type: Boolean },
    };
  }

  updated(changedProps) {
    if (changedProps.has('_page') || changedProps.has('_categoryName')) {
      // TODO: For list view, scroll to the last saved position only if the category has not changed
      scroll({ top: 0, behavior: 'silent' });
    }
    if (changedProps.has('_page')) {
      // TODO: Remove this when app-header updated to use ResizeObserver so we can avoid this bit.
      // The size of the header depends on the page (e.g. on some pages the tabs
      // do not appear), so reset the header's layout when switching pages.
      const header = this.shadowRoot.querySelector('#header');
      header.resetLayout();
    }
    if (changedProps.has('_meta')) {
      if (this._meta) {
        updateMetadata({
          title: this._meta.title,
          description: this._meta.description || this._meta.title,
          image: this._meta.image || this.baseURI + 'images/shop-icon-128.png',
        });
      }
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(updateLocation(location)));
    installMediaQueryWatcher(
      '(max-width: 767px)',
      (matches) => (this._smallScreen = matches),
    );

    // Custom elements polyfill safe way to indicate an element has been upgraded.
    this.removeAttribute('unresolved');
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._lazyResourcesLoaded = state.app.lazyResourcesLoaded;
  }
}

customElements.define('shop-app', ShopApp);
