import { Routes } from '@angular/router';
import { FtpAccountManagerComponent } from './ftp-account-manager/ftp-account-manager.component';
import { HcpHomeMenuComponent } from './hcp-home-menu/hcp-home-menu.component';
import { CreateFtpAccountComponent } from './ftp-account-manager/create-ftp-account/create-ftp-account.component';
import { DeleteFtpAccountComponent } from './ftp-account-manager/delete-ftp-account/delete-ftp-account.component';
import { EditFtpAccountComponent } from './ftp-account-manager/edit-ftp-account/edit-ftp-account.component';
import { FtpPermissionsComponent } from './ftp-account-manager/ftp-permissions/ftp-permissions.component';
import { AwstatsComponent } from './open-source-app/awstats/awstats.component';

export const routes: Routes = [
  { path: '', component: HcpHomeMenuComponent },
  { path: 'ftp-manager', component: FtpAccountManagerComponent },
  { path: 'ftp-manager/add', component: CreateFtpAccountComponent },
  { path: 'ftp-manager/delete', component: DeleteFtpAccountComponent },
  { path: 'ftp-manager/edit', component: EditFtpAccountComponent },
  { path: 'open-source-app/awstats', component: AwstatsComponent },
  { path: 'ftp-manager/edit-permissions', component: FtpPermissionsComponent }
];