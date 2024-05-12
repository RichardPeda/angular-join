import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-detail-card',
  standalone: true,
  imports: [MatDialogModule, PriorityBadgeComponent, CommonModule],
  templateUrl: './dialog-detail-card.component.html',
  styleUrl: './dialog-detail-card.component.scss',
})
export class DialogDetailCardComponent {
  localData: Task;
  editmode = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public dialogRef: MatDialogRef<DialogDetailCardComponent>
  ) {
    this.localData = { ...data };
  }

  toggleSubtaskStatus(index: number) {
    this.data.subtasks[index].done = !this.data.subtasks[index].done;
  }

  updateData() {
    if (JSON.stringify(this.localData) !== JSON.stringify(this.data)) {
      this.dialogRef.close({ event: 'update', data: this.data });
    } else {
      this.dialogRef.close({ event: 'close', data: this.data });
    }
  }

  deleteTask() {
    this.dialogRef.close({ event: 'delete' });
  }

  switchToEditMode() {
    this.dialogRef.close({ event: 'editmode'});
  }
}
