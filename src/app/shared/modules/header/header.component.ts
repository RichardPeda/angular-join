import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../../../services/userdata.service';
import { ClickOutsideMenuDirective } from '../../click-outside-menu.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ClickOutsideMenuDirective, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  docId = '';
  initials = '';
  showMenu = false;
  constructor(private userService: UserdataService, private router: Router) {
    this.docId = this.userService.loadIdFromSessionStorage();
    this.initials = this.userService.loadDataFromSessionStoarage('initials');
  }

  linkToHelp() {
    this.router.navigate(['help']);
  }
  linkToLegalNotice() {
    this.router.navigate(['legal-notice']);
  }
  linkToPrivacyPolicy() {
    this.router.navigate(['privacy-policy']);
  }

  linkToStartPage() {
    this.router.navigate(['']);
  }

  logOut() {
    this.linkToStartPage();
    this.userService.deleteDataInSessionStorage('userId')
  }

  openMenu() {
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false;
  }
}
