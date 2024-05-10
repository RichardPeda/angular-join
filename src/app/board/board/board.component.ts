import { Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../shared/modules/header/header.component';
import { NavbarComponent } from '../../shared/modules/navbar/navbar.component';
import { BoardCardComponent } from '../board-card/board-card.component';
import { User } from '../../interfaces/user.interface';
import { UserdataService } from '../../services/userdata.service';
import { SessiondataService } from '../../services/sessiondata.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, BoardCardComponent],
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
    private _renderer: Renderer2
  ) {
    this.localUser = this.sessionDataService.user;
  }

  async ngOnInit() {
    this._renderer.setStyle(document.body, 'overflow-x', 'hidden');
    this._subscriptionUser = this.sessionDataService.userSubject.subscribe(
      (user: User) => {
        this.localUser = user;
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionUser.unsubscribe();
  }
}
