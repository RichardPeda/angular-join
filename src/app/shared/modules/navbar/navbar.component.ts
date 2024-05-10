import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../../../services/userdata.service';
import { CommonModule, Location } from '@angular/common';
import { SessiondataService } from '../../../services/sessiondata.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  docId = '';
  selectedPageName = 'summary';

  constructor(
    private userService: UserdataService,
    private router: Router,
    private location: Location,
    private sessionDataService: SessiondataService
  ) {
    this.docId = this.userService.loadIdFromSessionStorage()!;
  }

  ngOnInit() {
    console.log(this.getURL());
  }

  linkToSummary() {
    this.router.navigate(['summary/' + this.docId]);
  }
  linkToContacts() {
    this.router.navigate(['contacts/' + this.docId]);
  }
  linkToAddTask() {
    this.router.navigate(['addtask/' + this.docId]);
  }

  getURL() {
    let path = this.location.path();
    if (path.includes('summary')) return 'summary';
    else if (path.includes('contacts')) return 'contacts';
    else if (path.includes('addtask')) return 'addtask';
    else return 'undefinded';
  }
}
