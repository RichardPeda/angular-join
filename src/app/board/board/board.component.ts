import { Component, OnChanges, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../shared/modules/header/header.component';
import { NavbarComponent } from '../../shared/modules/navbar/navbar.component';
import { BoardCardComponent } from '../board-card/board-card.component';
import { User } from '../../interfaces/user.interface';
import { UserdataService } from '../../services/userdata.service';
import { SessiondataService } from '../../services/sessiondata.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDetailCardComponent } from '../dialog-detail-card/dialog-detail-card.component';
import { EditTaskComponent } from '../../edit-task/edit-task.component';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    BoardCardComponent,
    MatDialogModule,
    DialogDetailCardComponent,
    EditTaskComponent,
    CommonModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  _subscriptionUser: any;
  _subscritiionDialog: any;
  editmode = false;
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };

  amountTasksTodo = 0;
  amountTasksInProgress = 0;
  amountTasksAwaitFeedback = 0;
  amountTasksDone = 0;

  constructor(
    public userService: UserdataService,
    public sessionDataService: SessiondataService,
    private _renderer: Renderer2,
    private dialog: MatDialog
  ) {
    this.localUser = this.sessionDataService.user;
  }

  async ngOnInit() {
    this._renderer.setStyle(document.body, 'overflow-x', 'hidden');
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
        console.log('user vom board', this.localUser.tasks);
        this.countTaskStatus();
      }
    );
    this.countTaskStatus();
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
    if (this._subscritiionDialog) {
      this._subscritiionDialog.unsubscribe();
    }
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(DialogDetailCardComponent, {
      minWidth: 'min(400px, 100%)',
      maxHeight: '100%',
      data: this.localUser.tasks[index],
    });
    this._subscritiionDialog = dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event == 'editmode') {
        this.openEditDialog(index);
      } else if (result && result.event == 'delete')
        this.localUser.tasks.splice(index, 1);

      this.sessionDataService.setTask(this.localUser.tasks);
    });
  }

  openEditDialog(index: number) {
    const editDialogRef = this.dialog.open(EditTaskComponent, {
      minWidth: 'min(400px, 100%)',
      maxHeight: '100%',
      data: this.localUser.tasks[index],
    });
  }

  resetCount() {
    this.amountTasksAwaitFeedback =
      this.amountTasksDone =
      this.amountTasksInProgress =
      this.amountTasksTodo =
        0;
  }

  countTaskStatus() {
    this.resetCount();
    this.localUser.tasks.forEach((element) => {
      if (element.status == 'toDo') this.amountTasksTodo++;
      if (element.status == 'awaitFeedback') this.amountTasksAwaitFeedback++;
      if (element.status == 'inProgress') this.amountTasksInProgress++;
      if (element.status == 'done') this.amountTasksDone++;
    });
  }
}
