import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HelperService, FormPage, FormQLMode, FormValidator, FormRule } from '@formql/core';

@Component({
  selector: 'formql-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent<T> implements OnInit {
  static componentName = 'PageEditorComponent';

  @Input() page: FormPage;
  @Input() data: T;
  @Input() mode: FormQLMode;
  @Output() action = new EventEmitter<any>();

  updatedPage: FormPage;
  disableSaveButton = false;
  validators: Array<FormValidator>;
  properties: Array<FormRule>;

  ngOnInit() {
    this.updatedPage = <FormPage>{};
    this.updatedPage = HelperService.deepCopy(this.page, ['sections']);
  }

  save() {
    this.page = HelperService.propertyCopy(this.updatedPage, this.page, ['sections']);
    this.action.emit(this.page);
  }

  actionTriggered($event) {
    if ($event) this.save();
    else this.action.emit();
  }

  cancel() {
    this.action.emit();
  }
}
