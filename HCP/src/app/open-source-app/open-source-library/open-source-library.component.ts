import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { OpenSourceService } from '../../services/open-source.service';

@Component({
  selector: 'app-open-source-library',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './open-source-library.component.html',
  styleUrls: ['./open-source-library.component.scss']
})
export class OpenSourceLibraryComponent implements OnInit {
  sCode: string = 'UNIX'; // Mock platform (UNIX or other)
  serviceDetailList = [
    {
      serviceCode: 'UNIX_BASE',
      activeQuantity: 2,
      limit: 10,
      percentageUsed: 20
    },
    {
      serviceCode: 'MSSQL',
      activeQuantity: 1,
      limit: 5,
      percentageUsed: 20
    }
  ]; // Mock ${serviceDetailList}
  appGroups = [
    {
      name: 'wordpress',
      category: 'blog',
      dataBaseServiceCode: 'base-database-mysql5',
      openSourceApps: [
        {
          appId: 'wp1',
          appType: 'wordpress',
          domainPath: 'example.com',
          httpPath: '/blog',
          dateInstalled: '2025-01-01',
          lastUpgradeDate: '2025-02-01',
          statusCode: 'PROCESSED',
          loginPageLink: '/wp-admin',
          resetPasswdLink: '/wp-login.php?action=lostpassword',
          helpLink: 'https://wordpress.org/support/',
          dbId: 'db1',
          dbIp: '192.168.1.1',
          defaultPage: false,
          version: '6.5'
        }
      ]
    },
    {
      name: 'joomla',
      category: 'cms',
      dataBaseServiceCode: 'base-database-mysql5',
      openSourceApps: [
        {
          appId: 'jo1',
          appType: 'joomla',
          domainPath: 'example.com',
          httpPath: '/cms',
          dateInstalled: '2025-03-01',
          lastUpgradeDate: '',
          statusCode: 'INSTALLING',
          loginPageLink: '/administrator',
          resetPasswdLink: '',
          helpLink: 'https://joomla.org/support/',
          dbId: '',
          dbIp: '',
          defaultPage: true,
          version: '4.4'
        }
      ]
    }
  ]; // Mock ${appGroups}
  appLimit: number = 5; // Mock limit
  mysqlQuantityAvailable: number = 3; // Mock
  mssqlQuantityAvailable: number = 2; // Mock
  reseller: string = 'other'; // Mock reseller (not inquent.netsol)

  constructor(private snackBar: MatSnackBar, private openSourceService: OpenSourceService, private router: Router) {}

  ngOnInit(): void {
    // TODO: Fetch service details and app groups from service
    this.openSourceService.getAppGroups().subscribe(data => {
      console.log('Fetched app groups:', data);
      // this.appGroups = data.appGroups || this.appGroups;
      // this.serviceDetailList = data.serviceDetails || this.serviceDetailList;
      // this.sCode = data.sCode || this.sCode;
    });
  }

  getDatabaseType(serviceCode: string): string {
    return serviceCode === 'UNIX_BASE' ? 'MySQL' : 'MSSQL';
  }

  getAppIcon(appName: string): string {
    // Mock icon logic; replace with actual image check if needed
    return `/assets/images/appicon-${appName}.gif`;
  }

  getStatusText(statusCode: string): string {
    switch (statusCode) {
      case 'CATASTROPHIC_ERROR':
        return 'Failed';
      case 'PROCESSED':
        return 'Installed';
      default:
        return 'Installing...';
    }
  }

  openManageApp(app: any): void {
    // Placeholder for manage app logic (e.g., log access)
    this.snackBar.open(`Managing ${app.appType}`, 'Close', { duration: 3000 });
  }

  installApp(appName: string, category: string): void {
    // Navigate to install wizard
    this.router.navigate(['/open-source-app/install'], { queryParams: { app: appName, app_category: category, operation: 'install' } });
  }

  performOperation(appId: string, appType: string, operation: string, version?: string): void {
    // Mock operations (remove, repair, reinstall, sethomepage, unsethomepage)
    this.openSourceService.performOperation(appId, appType, operation, version).subscribe(() => {
      this.snackBar.open(`${operation} initiated for ${appType}`, 'Close', { duration: 3000 });
    });
  }

  openPhpMyAdmin(dbId: string): void {
    // Mock phpMyAdmin access
    this.openSourceService.getPhpMyAdminUrl(dbId).subscribe(url => {
      window.open(url, '_blank');
    });
  }
}