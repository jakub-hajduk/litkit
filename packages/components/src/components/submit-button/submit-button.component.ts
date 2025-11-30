import { property } from 'lit/decorators.js'
import { CustomEventEmitter, Listen, ListenKeys,  InternalsSymbol, Aria } from 'litkit'
import { BaseComponent } from '../base/base.component'

export class SubmitButtonComponent extends BaseComponent {
  protected action = new CustomEventEmitter(this, 'action')

  @Aria('role') _role = 'button'

  static formAssociated = true

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
    const result = this.action.emit(this.value)
    if (result) {
      console.log( this[InternalsSymbol] )
      this[InternalsSymbol]?.form?.submit()
    }
  }
}
