import "./components/button/ui-button";
import "./components/header/ui-header";

const css = `
<style>
#my-app {
  text-align: center;
}
</style>
`;

class myApp extends HTMLElement {

  constructor() {
    super();
    this.render()
  }

  render() {
    this.innerHTML += `
    ${css}
    <div id="my-app">
    <ui-header></ui-header>
    
    <h1>Web Components</h1>
    <ui-button btnsize="sm" text="Click - SM" ></ui-button>
    <ui-button btnsize="md" text="Click - MD" ></ui-button>
    <ui-button btnsize="lg" text="Click - LG" ></ui-button>
        
    <script>
      var list = document.querySelector("custom-list");
      var input = document.querySelector("input");
      input.onchange = (evt) => {
        list.setAttribute("filter", evt.target.value);
      }
    </script>
    </div>
    `;
  }
}

customElements.define("my-app", myApp);
