import { property } from 'lit/decorators.js'
import { Aria, Role } from 'litkit'
import { FormField } from '../../mixins/form/form.mixin'
import { BaseComponent } from '../base/base.component'

@Role('textbox')
export class TextFieldComponent extends FormField(BaseComponent) {
  @Aria('ariaRequired')
  @property({ type: Boolean, reflect: true })
  required = false;

  @Aria('ariaReadOnly')
  @property({ type: Boolean, reflect: true })
  readOnly = false;

  @Aria('ariaDisabled')
  @property({ type: Boolean, reflect: true })
  disabled = false;
}
