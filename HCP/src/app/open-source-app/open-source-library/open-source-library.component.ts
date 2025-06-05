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
  sCode: string = 'UNIX';
  serviceDetailList = [
    { serviceCode: 'UNIX_BASE', activeQuantity: 2, limit: 10, percentageUsed: 20 },
    { serviceCode: 'MSSQL', activeQuantity: 1, limit: 5, percentageUsed: 20 }
  ];
  appGroups = [
    {
      name: 'wordpress',
      category: 'blog',
      dataBaseServiceCode: 'base-database-mysql5',
      openSourceApps: [
        {
          appId: 'wp1',
          appType: 'wordpress',
          appName: 'WordPress', // Added for clarity
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
          version: '6.5',
          expanded: false // For expansion panel
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
          appName: 'Joomla', // Added for clarity
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
          version: '4.4',
          expanded: false // For expansion panel
        }
      ]
    }
  ];
  appLimit: number = 5;
  mysqlQuantityAvailable: number = 3;
  mssqlQuantityAvailable: number = 2;
  reseller: string = 'other';

  constructor(
    private snackBar: MatSnackBar,
    private openSourceService: OpenSourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openSourceService.getAppGroups().subscribe({
      next: (data: { appGroups: any[]; serviceDetails: any[]; sCode: string }) => {
        this.appGroups = data.appGroups.length ? data.appGroups : this.appGroups;
        this.serviceDetailList = data.serviceDetails.length ? data.serviceDetails : this.serviceDetailList;
        this.sCode = data.sCode || this.sCode;
      },
      error: () => this.snackBar.open('Failed to load app groups', 'Close', { duration: 5000 })
    });
  }

  isExpansionRow(_: number, row: any): boolean {
    return !!row.expanded;
  }

  getDatabaseType(serviceCode: string): string {
    return serviceCode === 'UNIX_BASE' ? 'MySQL' : 'MSSQL';
  }

  getAppIcon(appName: string): string {
    return `/assets/images/appicon-${appName}.gif`;
  }

  getStatusText(statusCode: string): string {
    switch (statusCode) {
      case 'CATASTROPHIC_ERROR': return 'Failed';
      case 'PROCESSED': return 'Installed';
      default: return 'Installing...';
    }
  }

  openManageApp(app: { appType: string }): void {
    this.snackBar.open(`Managing ${app.appType}`, 'Close', { duration: 3000 });
  }

  installApp(appName: string, category: string): void {
    this.openSourceService.checkPHPVersion(appName).subscribe({
      next: (response: { requiredPHPVersions: string; PHPVersionCompatible: boolean; currentPHPVersion: string }) => {
        if (!response.PHPVersionCompatible) {
          this.snackBar.open(
            `PHP ${response.currentPHPVersion} is not compatible. Required: ${response.requiredPHPVersions}. Update in PHP Manager.`,
            'Close',
            { duration: 5000 }
          );
        } else {
          this.router.navigate(['/open-source-app/install'], {
            queryParams: { app: appName, app_category: category, operation: 'install' }
          });
        }
      },
      error: () => this.snackBar.open('Failed to check PHP version', 'Close', { duration: 5000 })
    });
  }

  performOperation(appId: string, appType: string, operation: string, version?: string): void {
    if (operation === 'reinstall') {
      this.openSourceService.checkPHPVersion(appType, version || '').subscribe({
        next: (response: { requiredPHPVersions: string; PHPVersionCompatible: boolean; currentPHPVersion: string }) => {
          if (!response.PHPVersionCompatible) {
            this.snackBar.open(
              `PHP ${response.currentPHPVersion} is not compatible. Required: ${response.requiredPHPVersions}. Update in PHP Manager.`,
              'Close',
              { duration: 5000 }
            );
          } else {
            this.executeOperation(appId, appType, operation, version);
          }
        },
        error: () => this.snackBar.open('Failed to check PHP version', 'Close', { duration: 5000 })
      });
    } else {
      this.executeOperation(appId, appType, operation, version);
    }
  }

  private executeOperation(appId: string, appType: string, operation: string, version?: string): void {
    this.openSourceService.performOperation(appId, appType, operation, version).subscribe({
      next: () => this.snackBar.open(`${operation} initiated for ${appType}`, 'Close', { duration: 3000 }),
      error: () => this.snackBar.open(`Failed to ${operation} ${appType}`, 'Close', { duration: 5000 })
    });
  }

  openPhpMyAdmin(dbId: string): void {
    this.openSourceService.getPhpMyAdminUrl(dbId).subscribe({
      next: (url: string) => window.open(url, '_blank'),
      error: () => this.snackBar.open('Failed to access phpMyAdmin', 'Close', { duration: 5000 })
    });
  }

  canManageDatabase(app: { appType: string; dbIp: string }): boolean {
    return (
      this.serviceDetailList.some(s => s.serviceCode === 'UNIX_BASE') &&
      app.appType !== 'screwturnwiki' &&
      !!app.dbIp
    );
  }
}