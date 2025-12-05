import { LitElement } from 'lit'

interface Ctor<T> {
  new (...args: any[]): T;
}

export type CustomElement<Ext extends object = object> = HTMLElement & LitElement & Ext

export interface ElementMock<Ext extends object = object, Element = HTMLElement & LitElement> {
  /**
   * Generated tagname of the element
   */
  tagName: string;
  /**
   * mocked and mounted element itself.
   */
  element: Element & Ext;
  /**
   * unmounting function that removes the element from DOM.
   */
  unmount: () => void;
}

export interface MockElementOptions {
  /**
   * Whether component should be mounted automatically to the document.
   */
  mount: boolean,
  /**
   * Where element should be mounted
   */
  mountingTarget: Element | HTMLElement,
  /**
   * Additional html to be injected into created element.
   */
  childrenHtml: string,
  /**
   * Explicit component tagname
   */
  tagName: string;
}

let count = 0;

/**
 * Generates incremented tagName for test component.
 * It may be used also in stories.
 */
export const generateElementName = () => `acc-test-${count++}`

/**
 * mockElement
 *
 * Utillity for mocking custom elements to manipulate them alter on.
 * You can call it in various ways. Please check the fucntion overloads.
 *
 * @example
 * ```
 * const element = mockElement(class extends LitElement {
 *   render() {
 *     return html`<h1>Hello!</h1>`
 *   }
 * })
 *
 * console.log( element.tagName )
 *
 * element.element.setAttribute('role', 'button')
 *
 * element.unmount()
 * ```
 */
export async function mockElement <Class extends LitElement>(klass: Ctor<Class>, options?: Partial<MockElementOptions>): Promise<ElementMock<Class>>;
export async function mockElement <Class extends LitElement>(klass: Ctor<Class>, childrenHtml?: string, options?: Partial<MockElementOptions>): Promise<ElementMock<Class>>;
export async function mockElement <Class extends LitElement>(klass: Ctor<Class>, childrenHtmlOrOptions?: string | Partial<MockElementOptions>, options?: Partial<MockElementOptions>): Promise<ElementMock<Class>> {
  let userOptions: Partial<MockElementOptions> = {};

  if (typeof childrenHtmlOrOptions === 'string') {
    userOptions.childrenHtml = childrenHtmlOrOptions;
  }

  if (childrenHtmlOrOptions?.constructor === Object) {
    userOptions = childrenHtmlOrOptions as MockElementOptions
  } else if (options?.constructor === Object) {
    userOptions = options
  }

  const finalOptions = {
    mount: true,
    tagName: generateElementName(),
    mountingTarget: document.body,
    ...userOptions
  } as MockElementOptions

  // `extends` is here to enable creting multiple instances of the same classes
  // TODO: force ShadowDOM to opened here if needed at some point
  customElements.define(finalOptions.tagName, class extends klass { })
  await customElements.whenDefined(finalOptions.tagName)
  const element = document.createElement(finalOptions.tagName) as Class

  if (finalOptions.childrenHtml) {
    element.innerHTML = finalOptions.childrenHtml
  }

  if (finalOptions.mount) {
    finalOptions.mountingTarget.appendChild(element)
  }

  // TODO: Add `children()` and `slottedElements()` methods
  return {
    tagName: finalOptions.tagName,
    element,
    unmount: () => element.remove()
  }
}
