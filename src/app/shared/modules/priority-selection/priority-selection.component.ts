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
  @Output() currentSelection = new EventEmitter<'medium' | 'urgent' | 'low'>();
  prioSelection: 'medium' | 'urgent' | 'low' = 'medium';

  selectPrio(title: 'medium' | 'urgent' | 'low') {
    this.prioSelection = title;
    this.currentSelection.emit(this.prioSelection);
  }
}
