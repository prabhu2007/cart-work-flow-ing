import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';

class ProgressStep extends LitElement {
  render() {
    const stepListItems = this.stepListItems;
    return html` <style>
        :host {
          display: flex;
          position: relative;
          margin-bottom: 24px;
        }

        .progress-container {
          width: 100%;
        }
        .progress {
          counter-reset: li;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-evenly;
          width: 100%;
          list-style: none;
          list-style-image: none;
          margin: 20px 0 20px 0;
          padding: 0;
        }

        .progress li {
          flex-grow: 1;
          text-align: center;
          position: relative;
        }

        .progress .name {
          display: block;
          margin-bottom: 1em;
          color: black;
          opacity: 0.3;
        }

        .progress .step {
          color: black;
          border: 3px solid silver;
          background-color: silver;
          border-radius: 50%;
          line-height: 1.2;
          width: 1.2em;
          height: 1.2em;
          display: inline-block;
        }

        .progress .step span.count:before {
          opacity: 0.3;
          content: counter(li);
          counter-increment: li;
        }

        .progress .active .name,
        .progress .active .step span {
          opacity: 1;
        }

        .progress .step:before {
          content: '';
          display: block;
          background-color: silver;
          height: 0.4em;
          width: 50%;
          position: absolute;
          bottom: 0.6em;
          left: -0.76em;
        }

        .progress .step:after {
          content: '';
          display: block;
          background-color: silver;
          height: 0.4em;
          width: 50%;
          position: absolute;
          bottom: 0.6em;
          right: -0.76em;
        }

        .progress li:first-of-type .step:before {
          display: none;
        }

        .progress li:last-of-type .step:after {
          display: none;
        }

        .progress .done .step,
        .progress .done .step:before,
        .progress .done .step:after,
        /* .progress .active .step, */
        .progress .done + .active .step:before {
          background-color: yellowgreen;
        }

        .progress .done .step,
        .progress .active .step {
          border: 3px solid yellowgreen;
        }
      </style>

      ${stepListItems.length > 0
        ? html`
            <div class="progress-container">
              <ol class="progress">
                ${repeat(
                  stepListItems,
                  (item) => html`
                    <li class="${item.progress}">
                      <span class="name">${item.name}</span>
                      <span class="step"><span class="count"></span></span>
                    </li>
                  `,
                )}
              </ol>
            </div>
          `
        : null}`;
  }

  static get properties() {
    return {
      stepListItems: { type: Array },
    };
  }
}

customElements.define('progress-step', ProgressStep);
