import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  setImg = false;
  name = '';
  greeting = 'Hello';

  penImgSrc = [
    '../../assets/img/pencil-dark.svg',
    '../../assets/img/pencil-white-r.svg',
  ];
  doneImgSrc = [
    '../../assets/img/done-dark.svg',
    '../../assets/img/done-white.svg',
  ];
  penImgIdx = 0;
  doneImgIdx = 0;

  constructor(private userService: UserdataService) {
    this.name = this.userService.loadDataFromSessionStoarage('name');
    this.greeting = this.greetingDay();
  }

  changeImg(name: 'pencil' | 'done') {
    name === 'pencil' ? (this.penImgIdx = 1) : (this.doneImgIdx = 1);
  }

  resetImg(name: 'pencil' | 'done') {
    name === 'pencil' ? (this.penImgIdx = 0) : (this.doneImgIdx = 0);
  }

  greetingDay(): string {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good day';
    } else {
      return 'Good evening';
    }
  }
}
