import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Contact } from '../../interfaces/contact.interface';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Subject, of } from 'rxjs';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MoveTaskDialogComponent } from '../../shared/modules/move-task-dialog/move-task-dialog.component';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [ProgressBarComponent, PriorityBadgeComponent, CommonModule, MatDialogModule, MoveTaskDialogComponent],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
})
export class BoardCardComponent {
  @Input() task: Task = {
    taskID: '',
    title: '',
    description: '',
    assignedContacts: [],
    priority: 'urgent',
    category: 'Technical Task',
    dueDate: '',
    status: 'toDo',
    subtasks: [],
  };

  @Output() clicked = new EventEmitter<boolean>();

  openCard = false;

constructor(private dialog: MatDialog){}


ngOnDestroy() {
 
}
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
  }
  openDetailCard() {
    this.openCard=true;
    this.clicked.emit(this.openCard);
  }

  openCardMoveMenu(event : MouseEvent) {
   
    event.stopPropagation()
    const moveDialogRef = this.dialog.open(MoveTaskDialogComponent, {
      width: '320px',
     
      minHeight: '320px',
      // panelClass: 'addtaskPopup',
    });
  }
}
