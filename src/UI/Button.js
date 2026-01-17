import {LitElement, css, html} from 'lit';
export default (()=>{
  let C = customElements.get("button-1c")
  if (C != null) return C
  C = class extends LitElement {
    static styles = (css`
      :host {
        display: contents;
        overflow: hidden;
        border-radius: 5px;
        min-width: 25px;
        min-height: 25px;
        button {
          all: inherit;
          ${css``/*
          height: inherit;
          min-width: inherit;
          min-height: inherit;
          max-width: inherit;
          max-height: inherit;
          margin: inherit;
          overflow: inherit;
          border-radius: inherit;
          */}
          padding: 0px;
          display: flex;
          align-items: center;
          background-color: #444;
          border: 1px solid #ffffff7f;
          
          #icon {
            overflow: scroll;
            width: var(--button-1c-icon-width, unset);
            height: var(--button-1c-icon-height, unset);
            min-width: inherit;
            min-height: inherit;
            ${css``/*background-color: #000;*/}
            padding: 2px;
            border: 1px solid #ffffff7f;
          }
          #content {
            display: flex;
            align-items: center;
            height: 100%;
            min-height: inherit;
            padding: 0px 2px;
          }
          
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
          <div id="icon">
            <slot name="icon"/>
          </div>
          <div id="content">
            <slot/>
          </div>
        </button>
      `)
    }
  }
  customElements.define("button-1c",C)
  return C
})()