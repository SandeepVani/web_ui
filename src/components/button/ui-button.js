const css = `
<style>
    button {
      background-color: #4CAF50;
      border: 2px solid #4CAF50;
      border-radius: 6px;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 30px;
      cursor: pointer;
    }

    button:hover {
        background-color: #ffff;
        color: #665e5e;
    }

    button.sm {
      padding: 10px 30px;
    }
    button.md {
      padding: 16px 50px;
    }
    button.lg {
      padding: 20px 70px;
    }
</style>
`;

export class Button extends HTMLElement {

  constructor() {
    super();
    this._btn;
    this._btnSize;
    this._showAlert;
    this.attachShadow({ mode: "open" });
    this.render();
  }

connectedCallback() {
  if(this.hasAttribute('btnsize')){
    this._btnSize = this.getAttribute('btnsize');
  };
  this._btn = this.shadowRoot.querySelector("button");
  this._btn.addEventListener("click", this._showAlert.bind(this));
};

_showAlert() {
  alert("Hey, Button Clicked!");
}

attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
        this.shadowRoot.querySelector('button').innerText = newValue;
    }
    if (name === 'btnsize') {
      this.shadowRoot.querySelector('button').setAttribute('class', newValue);
    }
}

static get observedAttributes() {
  return ['btnsize', 'text'];
}

disconnectedCallback(){
  this._btn.removeEventListener('click', this._showAlert);
}

render() {
    this.shadowRoot.innerHTML = `
    ${css}
    <button class="${this._btnSize}">${this.getAttribute('text')}</button>
    <script>
        var btn = document.querySelector("#button");
        btn.onclick = function(evt) {
            alert("Hey");
        }
    </script>
    `;
  }
}

customElements.define("ui-button", Button);
