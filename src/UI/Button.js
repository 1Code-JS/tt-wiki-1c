import {LitElement, css, html} from 'lit';
export default (()=>{
  let C = customElements.get("button-1c")
  if (C != null) return C
  C = class extends LitElement {
    static styles = (css`
      :host {
        display: contents;
        padding: 3px 8px;
        overflow: hidden;
        border-radius: 5px;
      }
      button {
        padding: inherit;
        width: inherit;
        height: inherit;
        margin: inherit;
        overflow: inherit;
        background-color: #444;
        border: 1px solid #ffffff7f;
        border-radius: inherit;
        &:hover {
          background-color: #555;
        }
        &:active {
          background-color: #666;
        }
        &:focus {
          border-color: #ffffff;
        }
      }
    `)
    
    constructor() {
      super()
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      super.attributeChangedCallback(name, oldValue, newValue)
      const btn = this.shadowRoot.querySelector("button") 
      if (newValue == null) {
        btn.removeAttribute(name)
      } else {
        btn.setAttribute(name,newValue)
      }
    }
    
    render() {
      return (html`
        <button>
          <slot/>
        </button>
      `)
    }
  }
  customElements.define("button-1c",C)
  return C
})()