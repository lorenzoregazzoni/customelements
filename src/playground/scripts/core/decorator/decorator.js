function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
}

function buildHandlers(attributesOrEvents, methodSuffix = "") {
  return Object.entries(attributesOrEvents).reduce((acc, item) => {
    acc[`handle${toPascalCase(item[0])}${methodSuffix}`] = item[1];

    return acc;
  }, {});
}

function buildAttributeHandlers(componentAttributes) {
  return buildHandlers(componentAttributes, "AttributeChanged");
}

function buildEventHandlers(componentEvents) {
  return buildHandlers(componentEvents, "Event");
}

function buildLifecycleMethods(component) {
  return {
    handleEvent(e) {
      this[`handle${toPascalCase(e.type)}Event`]?.(e);
    },
    attributeChangedCallback(name, oldValue, newValue) {
      this[`handle${toPascalCase(name)}AttributeChanged`]?.(oldValue, newValue);

      this.onAttributeChanged?.(name, oldValue, newValue);
    },
    connectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.addEventListener(event, this);
      }

      this.onConnected?.();
    },
    disconnectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.removeEventListener(event, this);
      }

      this.onDisconnected?.();
    },
  };
}

export function componentDecorator(component) {
  // ensure static meta properties
  // noop??

  // register the custom element
  // TODO: create snake case from component.name
  const isAttribute = component.isAttribute ?? `mt-${component.name.toLowerCase()}`;
  const extendsOptions = { extends: component.extendsElement ?? "div" };

  !customElements.get(isAttribute) && customElements.define(isAttribute, component, extendsOptions);

  // apply mixins to prototype class
  Object.assign(
    component.prototype,
    { componentName: isAttribute },
    component.attributes && { ...buildAttributeHandlers(component.attributes) },
    component.events && { ...buildEventHandlers(component.events) },
    buildLifecycleMethods(component),
  );

  // When attribute handlers map is provided, expose observed attributes to the platform
  component.attributes && (component.observedAttributes = Object.keys(component.attributes));

  // connectedCallback(): Called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
  // disconnectedCallback(): Called each time the element is removed from the document.
  // connectedMoveCallback(): When defined, this is called instead of connectedCallback() and disconnectedCallback() each time the element is moved to a different place in the DOM via Element.moveBefore(). Use this to avoid running initialization/cleanup code in the connectedCallback() and disconnectedCallback() callbacks when the element is not actually being added to or removed from the DOM. See Lifecycle callbacks and state-preserving moves for more details.
  // adoptedCallback(): Called each time the element is moved to a new document.

  // static observedAttributes = ["color", "size"];
  // attributeChangedCallback(): Called when attributes are changed, added, removed, or replaced. See Responding to attribute changes for more details about this callback.

  // expose the component class globally
}
