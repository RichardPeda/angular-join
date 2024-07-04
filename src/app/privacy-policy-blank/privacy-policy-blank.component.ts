import { Component } from '@angular/core';
import { NavbarBlankComponent } from '../shared/modules/navbar-blank/navbar-blank.component';
import { RouterModule } from '@angular/router';
import { HeaderBlankComponent } from '../shared/modules/header-blank/header-blank.component';

@Component({
  selector: 'app-privacy-policy-blank',
  standalone: true,
  imports: [NavbarBlankComponent,HeaderBlankComponent, RouterModule],
  templateUrl: './privacy-policy-blank.component.html',
  styleUrl: './privacy-policy-blank.component.scss'
})
export class PrivacyPolicyBlankComponent {

}
