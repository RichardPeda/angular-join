import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../../../services/userdata.service';
import { SessiondataService } from '../../../services/sessiondata.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  docId = '';

  constructor(private userService: UserdataService, private router: Router, private sessionServic : SessiondataService) {
    this.docId = this.userService.loadIdFromSessionStorage()!;
  }

  linkToSummary() {
    this.router.navigate(['summary/' + this.docId]);
  }
  linkToContacts() {
    this.router.navigate(['contacts/' + this.docId]);
  }
}
