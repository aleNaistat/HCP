import { Routes } from '@angular/router';
import { FtpAccountManagerComponent } from './ftp-account-manager/ftp-account-manager.component';
import { HcpHomeMenuComponent } from './hcp-home-menu/hcp-home-menu.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
  { path: '', component: HcpHomeMenuComponent },
  { path: 'ftp-manager', component: FtpAccountManagerComponent }
];