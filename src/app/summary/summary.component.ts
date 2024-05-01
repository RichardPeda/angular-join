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

}
