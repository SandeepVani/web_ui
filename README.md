# Web Components 

A Web Component is a way to create an encapsulated, single-responsibility code block that can be reused on any page.

# Lifecycle Methods
 
The browser automatically calls six methods throughout the lifecycle of the Web Component state.

1. constructor(): 
It’s called when the component is first initialized. It must call super() and can set any defaults or perform other pre-rendering processes.

super(): make sure that the component inherits the correct prototype chain and all properties and methods of the class it extends


2.  connectedCallback(): 
When element is added to the DOM, the connectedCallback method is triggered. From that moment we can be sure that its available in the DOM and we’re able to safely set attributes, fetch resources, run setup code or render templates.

connectedCallback() {
  ...
}

3. disconnectedCallback()
This lifecycle hook is triggered when the element is removed from the DOM and is the ideal place to add cleanup logic.

disconnectedCallback() {
  ...
}

4. static observedAttributes(): 
Returns an array of attributes that the browser will observe.

static get observedAttributes() {
  return ['prop1', 'prop2', 'prop3'];
}


5. attributeChangedCallback(attrName, oldVal, newVal)

Called whenever an observed attribute is changed. Those defined in HTML are passed immediately, but JavaScript can modify them:


attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${'prop1'}' value has been changed from ${oldValue} to ${newValue}`);
}


6. adoptedCallback()

This function is called when a Web Component is moved from one document to another. 

In general, this will only occur when dealing with <iframe/> elements where each iframe has its own DOM, but when it happens the adoptedCallback lifecycle hook is triggered. We can use it to interact with the owner document, the main document or other elements.

adoptedCallback() {
  ...
}

# How Web Components Interact With Other Elements 

Web Components offer some unique functionality you won’t find in JavaScript frameworks. 

1. The Shadow DOM

While the Web Component we’ve built above works, it’s not immune to outside interference, and CSS or JavaScript could modify it. Similarly, the styles you define for your component could leak out and affect others.

The Shadow DOM solves this encapsulation problem by attaching a separated DOM to the Web Component with:

const shadow = this.attachShadow({ mode: 'closed/open' });


2. HTML Templates

Defining HTML inside a script can become impractical for more complex Web Components. A template allows you to define a chunk of HTML in your page that your Web Component can use. 

This has several benefits:

- You can tweak HTML code without having to rewrite strings inside your JavaScript.

- Components can be customized without having to create separate JavaScript classes for each type.


- It’s easier to define HTML in HTML — and it can be modified on the server or client before the component renders.

Templates are defined in a <template> tag, and it’s practical to assign an ID so you can reference it within the component class. This example three paragraphs to display the “Hello” message:

<template id="hello-world">

  <style>
    p {
      text-align: center;
      font-weight: normal;
      padding: 0.5em;
      margin: 1px 0;
      background-color: #eee;
      border: 1px solid #666;
    }
  </style>

  <p class="hw-text">Text Copy</p>

</template>

The Web Component class can access this template, get its content, and clone the elements to ensure you’re creating a unique DOM fragment everywhere it’s used:

const template = document.getElementById('hello-world').content.cloneNode(true);

The DOM can be modified and added directly to the Shadow DOM:

connectedCallback() {
  const shadow = this.attachShadow({ mode: 'closed' })
  const template = document.getElementById('hello-world').content.cloneNode(true)
  shadow.append( template );
}


# Template Slots
Slots allow you to customize a template.

<modal>
<slot name="title" ></slot>
<slot name="paragraph" ></slot>
<slot></slot>
</modal>



<template id="modalId">

  <slot name="title">
    <h1 slot="title">Hello Default!</h1>
  </slot>

  <slot name="paragraph">
    <p slot="paragraph">Hello Default!</p>
  </slot>

  <slot>
    <p>This text will become part of the component.</p>
  </slot>

</template>

In addition, you cannot directly style the inserted elements, although you can target specific slots within your Web Component:

<template id="hello-world">

  <style>
    slot[name="msgtext"] { color: green; }
  </style>

  <slot name="msgtext" class="hw-text"></slot>
  <slot></slot>

</template>


# Shadow DOM Events
Your Web Component can attach events to any element in the Shadow DOM just like you would in the page DOM, such as to listen for click events on all inner children:


shadow.addEventListener('click', e => {

  // do something

});




________________________________________________________________________

Few more important Concepts:

getAttribute('text')
hasAttribute('text')
setAttribute('text')
is="confirm-link"
:host(.wrapper-container)
:host-context(p .wrapper-container)
::slotted(.heighlight)

_________________________________________________________________________