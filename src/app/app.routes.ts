import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './shared/modules/navbar/navbar.component';
import { HeaderComponent } from './shared/modules/header/header.component';

export const routes: Routes = [
    // { path: '', component: LoginComponent, data: { animation: 'openClosePage' } },
    // { path: 'signup', component: SignUpComponent, data: { animation: 'openClosePage' } },
    // { path: '', component: NavbarComponent },
    { path: '', component: HeaderComponent },
];
