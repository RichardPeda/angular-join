import { Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../shared/modules/header/header.component';
import { NavbarComponent } from '../../shared/modules/navbar/navbar.component';
import { BoardCardComponent } from '../board-card/board-card.component';
import { User } from '../../interfaces/user.interface';
import { UserdataService } from '../../services/userdata.service';
import { SessiondataService } from '../../services/sessiondata.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDetailCardComponent } from '../dialog-detail-card/dialog-detail-card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    BoardCardComponent,
    MatDialogModule,
    DialogDetailCardComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  _subscriptionUser: any;
  localUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    contacts: [],
    tasks: [],
  };

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
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }

  openDialog(index:number) {
    // console.log(this.localUser.tasks[0]);

    this.dialog.open(DialogDetailCardComponent, {
      minWidth: 'min(400px, 100%)',
      maxHeight: '100%',
      data: this.localUser.tasks[index],
    });
  }
}
