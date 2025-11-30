import { property } from 'lit/decorators.js'
import { CustomEventEmitter, Listen, ListenKeys, Aria } from 'litkit'
import { BaseComponent } from '../base/base.component'

export class ButtonComponent extends BaseComponent {
  protected action = new CustomEventEmitter(this, 'action')

  static formAssociated = true

  @Aria('role') _role = 'button'

  /**
   * Button label
   */
  @Aria('ariaLabel')
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * Whether button is disabled or not
   */
  @Aria('ariaDisabled')
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({
    reflect: true,
    type: Boolean
  }) submit?: boolean

  @property({
    reflect: true,
    type: String
  }) value?: string | number

  @Listen('click')
  @Listen('touchend')
  @ListenKeys('keydown', ['Space', 'Enter'])
  performAction() {
    this.action.emit(this.value)
  }
}
