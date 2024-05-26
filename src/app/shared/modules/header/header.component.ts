import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../../../services/userdata.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  docId = '';
  initials = '';
  constructor(private userService: UserdataService, private router: Router) {
    this.docId = this.userService.loadIdFromSessionStorage();
    this.initials = this.userService.loadDataFromSessionStoarage('initials');
  }

  linkToHelp() {
    this.router.navigate(['help']);
  }
}
