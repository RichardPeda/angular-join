import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    // { path: '', component: LoginComponent },
    { path: '', component: SignUpComponent },
    // { path: '', component: LogoAnimationComponent },
];
