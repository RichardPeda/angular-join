import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { HeaderComponent } from '../shared/modules/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  setImg = false;;

  penImgSrc = ["../../assets/img/pencil-dark.svg", "../../assets/img/pencil-white-r.svg"];
  doneImgSrc = ["../../assets/img/done-dark.svg", "../../assets/img/done-white.svg"];
  penImgIdx = 0;
  doneImgIdx = 0;

  changeImg(name: 'pencil' | 'done') {
    name === 'pencil' ? this.penImgIdx = 1 : this.doneImgIdx = 1
  }

  resetImg(name: 'pencil' | 'done') {
    name === 'pencil' ? this.penImgIdx = 0 : this.doneImgIdx = 0
  }

}
