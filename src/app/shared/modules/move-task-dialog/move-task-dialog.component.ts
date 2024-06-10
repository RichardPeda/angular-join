import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-move-task-dialog',
  standalone: true,
  imports: [FormsModule, MatRadioModule],
  templateUrl: './move-task-dialog.component.html',
  styleUrl: './move-task-dialog.component.scss',
})
export class MoveTaskDialogComponent {
  status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done' = 'toDo';
  moveTo: string[] = ['todo', 'in progress', 'Await feedback', 'done'];
}
