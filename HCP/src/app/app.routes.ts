import { Routes } from '@angular/router';
import { FtpAccountManagerComponent } from './ftp-account-manager/ftp-account-manager.component';
import { HcpHomeMenuComponent } from './hcp-home-menu/hcp-home-menu.component';
import { CreateFtpAccountComponent } from './ftp-account-manager/create-ftp-account/create-ftp-account.component';
import { DeleteFtpAccountComponent } from './ftp-account-manager/delete-ftp-account/delete-ftp-account.component';
import { EditFtpAccountComponent } from './ftp-account-manager/edit-ftp-account/edit-ftp-account.component';
import { FtpPermissionsComponent } from './ftp-account-manager/ftp-permissions/ftp-permissions.component';
import { AwstatsComponent } from './open-source-app/awstats/awstats.component';
import { OpenSourceLibraryComponent } from './open-source-app/open-source-library/open-source-library.component';
import { OpenSourceAppsListComponent } from './open-source-app/open-source-apps-list/open-source-apps-list.component';

export const routes: Routes = [
  { path: '', component: HcpHomeMenuComponent },
  { path: 'ftp-manager', component: FtpAccountManagerComponent },
  { path: 'ftp-manager/add', component: CreateFtpAccountComponent },
  { path: 'ftp-manager/delete', component: DeleteFtpAccountComponent },
  { path: 'ftp-manager/edit', component: EditFtpAccountComponent },  
  { path: 'ftp-manager/edit-permissions', component: FtpPermissionsComponent },
  { path: 'open-source-app/awstats', component: AwstatsComponent },
  { path: 'open-source-app/library', component: OpenSourceLibraryComponent },
  { path: 'open-source-app/list', component: OpenSourceAppsListComponent },
  { path: 'open-source-app/install', redirectTo: '/open-source-app/list' }, // Placeholder for wizard
  { path: 'php-manager', redirectTo: '/open-source-app/list' }, // Placeholder
  { path: 'iis-settings', redirectTo: '/open-source-app/list' },
];