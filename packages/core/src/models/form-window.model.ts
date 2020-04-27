import { FormPage } from './form-page.model';
import { FormComponent } from './form-component.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormQLMode } from './type.model';

export interface FormWindow {
    error: FormError;
    pages: FormPage[];
    layoutComponentName: string;
    formName: string;
    class: string;
    dataSource: FormDataSource;
}

export interface FormDataSource {
    type: string;
    query: string;
    mutation: string;
    deltaMode: boolean;
}

export interface FormState {
    data: any;
    form: FormWindow;
    reactiveForm: FormGroup;
    components: FormComponents;
    formControls: FormControls;
    ids: Array<string>;
    isLoading: boolean;
    mode: FormQLMode;
    error: any;
}

export interface FormError {
    title: string;
    message: string;
    error: any;
}

export declare interface FormComponents {
    [key: string]: FormComponent<any>;
}

export declare interface FormControls {
    [key: string]: FormControl;
}



