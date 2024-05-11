import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {}
}
