import { css } from 'lit'
import { Aria } from 'litkit'
import { FormField } from '../../mixins/form/form.mixin'
import { BaseComponent } from '../base/base.component'

export class TextFieldComponent extends FormField(BaseComponent) {
  @Aria('role') _role = 'textbox'

  constructor() {
    super()
    console.log('dsd')
  }

}
