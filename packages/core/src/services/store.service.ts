import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from '../models/form-component.model';
import { FormPage } from '../models/form-page.model';
import { FormSection } from '../models/form-section.model';
import { FormError, FormState } from '../models/form-window.model';
import { InternalEventType } from '../models/internal-event.model';
import { ComponentResolverService } from '../services/component-resolver.service';
import { FormService } from './form.service';
import { HelperService } from './helper.service';
import { FormQLMode } from '../models/type.model';

@Injectable({ providedIn: 'root' })
export class StoreService implements OnDestroy {
  constructor(
    private formService: FormService,
    private componentResolverService: ComponentResolverService,
    private formBuilder: FormBuilder
  ) { }

  private data$ = new Subject<any>();

  private formState$ = new Subject<FormState>();

  private readonly serviceDestroyed = new Subject();

  private formState: FormState;

  // private formControls: FormControls;


  ngOnDestroy(): void {
    this.data$.complete();
    this.data$.unsubscribe();
  }

  getData(): Observable<FormComponent<any>[]> {
    return this.data$.asObservable();
  }

  getFormState(): Observable<FormState> {
    return this.formState$.asObservable();
  }

  updateComponent(component: FormComponent<any>) {
    this.formState = this.formService.updateComponent(component, this.formState, false);
    this.data$.next({ ...this.formState.data });
    this.formState$.next({ ...this.formState });
  }

  setComponent(component: FormComponent<any>) {
    this.formState = this.formService.updateComponent(component, this.formState, true);
    // this.formControls = HelperService.resetValidators(this.formState.components, this.formControls, this.componentResolverService);
    this.data$.next({ ...this.formState.data });
    this.formState$.next({ ...this.formState });
  }

  getAll(formName: string, ids: Array<string>, mode: FormQLMode) {
    this.formService.getFormAndData(formName, ids).pipe(takeUntil(this.serviceDestroyed)).subscribe(response => {
      this.formState = { ...response };
      this.formState.ids = ids;
      this.formState.mode = mode;
      this.data$.next({ ...response.data });
      this.formState$.next(this.formState);
    },
      error => {
        this.formState$.next(<FormState>{
          form: {
            error: HelperService.formatError(<FormError>{
              title: 'Error loading form or data',
              error: error
            })
          }
        });
      });
  }

  saveForm() {
    this.formService.saveForm(this.formState.form.formName, this.formState.form);
  }

  saveData() {
    return this.formService.saveData(this.formState.form.dataSource, this.formState.ids, this.formState.data);
  }

  validateForm() {
    HelperService.validateForm(this.formState.reactiveForm);
  }

  isFormValid() {
    return this.formState.reactiveForm.valid;
  }

  unsubscribeAll() {
    this.serviceDestroyed.next();
    this.serviceDestroyed.complete();
  }

  reSetForm(eventType: InternalEventType, event: any) {
    switch (eventType) {
      case InternalEventType.EditingForm:
        this.populateReactiveForm();
        break;

      case InternalEventType.DndFormChanged:
        const pageId = (<FormPage>event).pageId;
        const indexDnd = this.formState.form.pages.findIndex(p => p.pageId === pageId);

        if (indexDnd >= 0)
          this.formState.form.pages[indexDnd] = event;

        this.populateReactiveForm();
        break;

      case InternalEventType.RemoveComponent:
        const componentId = (<FormComponent<any>>event).componentId;
        let updateSectionId = '';
        this.formState.form.pages.forEach(page => {
          page.sections.forEach(section => {
            const indexComponent = section.components.findIndex(c => c.componentId === componentId);
            if (indexComponent >= 0) {
              section.components.splice(indexComponent, 1);
              updateSectionId = section.sectionId;
            }
          });
        });
        this.populateReactiveForm();
        break;

      case InternalEventType.RemoveSection:
        const sectionId = (<FormSection>event).sectionId;
        let updatePageId = '';
        this.formState.form.pages.forEach(page => {
          const indexSection = page.sections.findIndex(c => c.sectionId === sectionId);
          if (indexSection >= 0) {
            page.sections.splice(indexSection, 1);
            updatePageId = page.pageId;
          }
        });
        this.populateReactiveForm();
        break;
    }
    this.formState$.next({ ...this.formState });
  }

  private populateReactiveForm() {
    if (this.formState.form.pages != null && this.formState.form.pages.length > 0) {
      // get reactive structure -> formControls, pageGroup and components if it's an update
      const reactiveFormStructure = HelperService.createReactiveFormStructure(this.formState.form, true, this.formState.data);
      this.formState.formControls = reactiveFormStructure.formControls;


      // if it's an update, refresh reactive form, set all form controls, validators
      this.formState.form.pages.forEach(page => {
        this.formState.reactiveForm.setControl(page.pageId, reactiveFormStructure.pageGroup[page.pageId]);
      });
      this.formState.form = HelperService.updateTemplates(this.formState.form);
      if (reactiveFormStructure.components != null && Object.keys(reactiveFormStructure.components).length > 0)
        this.formState.formControls = HelperService.resetValidators(reactiveFormStructure.components,
              this.formState.formControls, this.componentResolverService);

      this.formState = this.formService.resolveConditions(this.formState);

    }
  }
}
