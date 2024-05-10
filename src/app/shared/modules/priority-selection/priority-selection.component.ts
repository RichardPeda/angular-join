import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-priority-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-selection.component.html',
  styleUrl: './priority-selection.component.scss',
})
export class PrioritySelectionComponent {
  @Output() currentSelection = new EventEmitter<string>();
  prioSelection = 'medium';

  selectPrio(title:string){
    this.prioSelection = title;
  }

}
