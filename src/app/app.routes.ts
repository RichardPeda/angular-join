import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './shared/modules/navbar/navbar.component';
import { HeaderComponent } from './shared/modules/header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { DataResolverService } from './services/data-resolver.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board/board.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, data: { animation: 'openClosePage' } },
    { path: 'signup', component: SignUpComponent, data: { animation: 'openClosePage' } },
    { path: 'summary/:id', component: SummaryComponent },
    { path: 'contacts/:id', data:{title : 'contacts'}, component: ContactsComponent },
    { path: 'addtask/:id', data:{title : 'Add task'}, component: AddTaskComponent },
    { path: 'board/:id', data:{title : 'Board'}, component: BoardComponent },
    { path: 'legal-notice', data:{title : 'Legal Notice'}, component: LegalNoticeComponent },
    { path: 'privacy-policy', data:{title : 'Privacy Policy'}, component: PrivacyPolicyComponent },
];
