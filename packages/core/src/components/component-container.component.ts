import { Component, OnInit, Input, ViewContainerRef,
    ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormComponent } from '../models/form-component.model';
import { InternalEventHandlerService } from '../services/internal-event-handler.service';
import { InternalEventType } from '../models/internal-event.model';
import { HelperService } from '../services/helper.service';
import { ComponentResolverService } from '../services/component-resolver.service';
import { FormGroup } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { FormQLMode, ContainerType } from '../models/type.model';
import { Subscription } from 'rxjs';

@Component({
    // tslint:disable-next-line: component-selector
    selector: '[formql-component-container]',
    template: `
    <div #wrapper formqlDnd
        [sourceObjectId]="component.componentId"
        [attr.componentId]="component.componentId"
        [sourceWrapperId]="sectionId"
        [type]="ContainerType.Component"
        [mode]="mode"
        [ngClass]="{'fql-component-container-wrapper': (mode === FormQLMode.Edit) }">
        <div class="fql-component-tooltip">
            <ng-container #tooltip></ng-container>
        </div>
        <div class="fql-component-container" [ngStyle]="component.style">
            <ng-container #content></ng-container>
        </div>
    </div>`,
    styleUrls: ['./component-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ComponentContainerComponent implements OnInit, OnDestroy {

    @ViewChild('content', { read: ViewContainerRef, static : true }) content: ViewContainerRef;
    @ViewChild('wrapper', { read: ViewContainerRef, static : true }) wrapper: ViewContainerRef;
    @ViewChild('tooltip', { read: ViewContainerRef, static : true }) tooltip: ViewContainerRef;

    @Input() component: FormComponent<any>;
    @Input() reactiveSection: FormGroup;
    @Input() sectionId: string;
    @Input()
    set value(value: any) {
        if (this.reactiveSection && this.component && this.reactiveSection.controls[this.component.componentId].value !== value)
            this.reactiveSection.controls[this.component.componentId].setValue(value);
    }

    @Input() mode: FormQLMode;

    public FormQLMode = FormQLMode;
    public ContainerType = ContainerType;

    formSubscription$: Subscription;

    constructor(
        private componentResolverService: ComponentResolverService,
        private viewContainerRef: ViewContainerRef,
        private eventHandlerService: InternalEventHandlerService,
        private storeService: StoreService
    ) {}

    ngOnInit() {
        const component = this.viewContainerRef.createComponent(this.componentResolverService.resolveComponent(
            this.component.componentName));
        (<any>component).instance.field = this.component;
        (<any>component).instance.formControl = this.reactiveSection.controls[this.component.componentId];

        this.content.insert(component.hostView);

        this.formSubscription$ = this.reactiveSection.controls[this.component.componentId].valueChanges.subscribe((change) => {
            if (this.component.value !== change) {
                this.component.value = change;
                this.storeService.updateComponent(this.component);
            }
        });

        if (this.mode === FormQLMode.Edit) {
            const tooltip = this.viewContainerRef.createComponent(this.componentResolverService.resolveComponent('TooltipComponent'));
            (<any>tooltip).instance.wrapper = this.wrapper;
            (<any>tooltip).instance.type = ContainerType.Component;
            (<any>tooltip).instance.object = this.component;
            this.tooltip.insert(tooltip.hostView);
        }
    }

    editField() {
        if (this.mode === FormQLMode.Edit)
            this.eventHandlerService.send(InternalEventType.EditingComponent, this.component);
    }

    ngOnDestroy(): void {
        this.formSubscription$.unsubscribe();
    }
}
