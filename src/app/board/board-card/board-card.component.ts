import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [],
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

  constructor() {}

  openCardMoveMenu(){}
}
