import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Contact } from '../../interfaces/contact.interface';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Subject, of } from 'rxjs';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [ProgressBarComponent, PriorityBadgeComponent, CommonModule],
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

 ngOnChanges(changes: SimpleChanges){
// console.log(changes)
 }
 

  openCardMoveMenu() {}
}
