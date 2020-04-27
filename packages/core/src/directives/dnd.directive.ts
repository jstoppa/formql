import {
  Directive,
  HostListener,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { ContainerType, FormQLMode } from '../models/type.model';
/*
    Directive to handle the start drag start and pass the information to the dnd-drop directive
*/
@Directive({
  selector: '[formqlDnd]',
})
export class DndDirective {
  constructor(private view: ViewContainerRef, private renderer: Renderer2) {}

  @Input() public sourceObjectId: string;
  @Input() public sourceWrapperId: string;
  @Input() public type: ContainerType;
  @Input() public mode: FormQLMode;

  @Output() synchronise: EventEmitter<any> = new EventEmitter();

  @HostListener('dragstart', ['$event']) public onDragStart($event) {
    if (this.mode !== FormQLMode.View) {
      const draggabble = this.view.element.nativeElement.getAttribute(
        'draggable'
      );
      if (
        draggabble === 'true' &&
        $event &&
        $event.dataTransfer &&
        this.sourceObjectId
      ) {
        $event.dataTransfer.effectAllowed = 'move';
        const sourceIds = this.sourceObjectId + '#' + this.sourceWrapperId;
        $event.dataTransfer.setData('Text', sourceIds);

        // only way I found to support drag and drop in IE (try and if it fails, do the IE way)
        try {
          $event.dataTransfer.setData(this.type.toString(), '');
        } catch {
          $event.dataTransfer.types.item[1] = this.type.toString();
        }
      }
    }
  }

  @HostListener('dragend', ['$event']) public onDragEnd($event) {
    if (this.mode !== FormQLMode.View)
      this.renderer.setAttribute(
        this.view.element.nativeElement,
        'draggable',
        'false'
      );
  }
}
