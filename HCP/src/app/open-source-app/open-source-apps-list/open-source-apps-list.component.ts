import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OpenSourceService } from '../../services/open-source.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-source-apps-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './open-source-apps-list.component.html',
  styleUrls: ['./open-source-apps-list.component.scss']
})
export class OpenSourceAppsListComponent implements OnInit {
  sCode: string = 'UNIX'; // Mock platform
  serviceDetailList = [
    { serviceCode: 'UNIX_BASE', activeQuantity: 2, limit: 10, percentageUsed: 20 },
    { serviceCode: 'MSSQL', activeQuantity: 1, limit: 5, percentageUsed: 20 }
  ]; // Mock ${serviceDetailList}
  categorizedApps = [
    {
      name: 'blog',
      label: 'Blogs',
      appInstalledMap: { wordpress: 1 },
      openSourceApps: [
        {
          name: 'wordpress',
          label: 'WordPress',
          description: 'A popular blogging platform and CMS.',
          version: '6.5',
          helpLink: 'https://wordpress.org/support/',
          dataBaseServiceCode: 'base-database-mysql5'
        }
      ]
    },
    {
      name: 'cms',
      label: 'Content Management Systems',
      appInstalledMap: { joomla: 1 },
      openSourceApps: [
        {
          name: 'joomla',
          label: 'Joomla',
          description: 'A flexible CMS for building websites.',
          version: '4.4',
          helpLink: 'https://joomla.org/support/',
          dataBaseServiceCode: 'base-database-mysql5'
        },
        {
          name: 'dotnetnuke',
          label: 'DotNetNuke',
          description: 'A Windows-based CMS.',
          version: '9.10',
          helpLink: 'https://dnncommunity.org/support/',
          dataBaseServiceCode: 'base-database-mssql'
        }
      ]
    }
  ]; // Mock ${categorizedApps}
  appLimit: number = 5; // Mock limit
  mysqlQuantityAvailable: number = 3; // Mock
  mssqlQuantityAvailable: number = 2; // Mock
  reseller: string = 'other'; // Mock reseller
  categoryControl = new FormControl('');
  categories: string[] = ['Select a Category...'].concat(this.categorizedApps.map(c => c.label));

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private openSourceService: OpenSourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openSourceService.getCategorizedApps().subscribe({
      next: (data: any) => {
        this.categorizedApps = data.categorizedApps || this.categorizedApps;
        this.serviceDetailList = data.serviceDetails || this.serviceDetailList;
        this.sCode = data.sCode || this.sCode;
        this.categories = ['Select a Category...'].concat(this.categorizedApps.map(c => c.label));
      },
      error: () => this.snackBar.open('Failed to load apps', 'Close', { duration: 5000 })
    });
  }

  getDatabaseType(serviceCode: string): string {
    return serviceCode === 'UNIX_BASE' ? 'MySQL' : 'MSSQL';
  }

  getAppIcon(appName: string): string {
    return `/assets/images/appicon-${appName}.gif`;
  }

  installApp(app: any, category: string): void {
    const windowsApps = ['blogengine', 'dotnetnuke', 'screwturnwiki'];
    if (windowsApps.includes(app.name)) {
      this.openSourceService.checkIISSettings().subscribe({
        next: (response: any) => {
          if (
            response.runtimeVersion !== app.requiredRuntimeVersion ||
            response.pipelineMode.toUpperCase() !== app.requiredPipelineMode?.toUpperCase()
          ) {
            this.dialog.open(IISWarningDialogComponent, {
              data: {
                currentRuntimeVersion: response.runtimeVersion,
                currentPipelineMode: response.pipelineMode,
                requiredRuntimeVersion: app.requiredRuntimeVersion,
                requiredPipelineMode: app.requiredPipelineMode
              }
            });
          } else {
            this.checkPHPVersion(app, category);
          }
        },
        error: () => this.snackBar.open('Failed to check IIS settings', 'Close', { duration: 5000 })
      });
    } else {
      this.checkPHPVersion(app, category);
    }
  }

  private checkPHPVersion(app: any, category: string): void {
    this.openSourceService.checkPHPVersion(app.name).subscribe({
      next: (response: any) => {
        if (!response.PHPVersionCompatible) {
          this.dialog.open(PHPWarningDialogComponent, {
            data: {
              currentPHPVersion: response.currentPHPVersion,
              requiredPHPVersions: response.requiredPHPVersions,
              appName: app.label
            }
          });
        } else {
          this.router.navigate(['/open-source-app/install'], {
            queryParams: { app: app.name, app_category: category, operation: 'install' }
          });
        }
      },
      error: () => this.snackBar.open('Failed to check PHP version', 'Close', { duration: 5000 })
    });
  }

  canInstallApp(category: any, app: any): boolean {
    if (category.appInstalledMap[app.name] >= this.appLimit) return false;
    if (app.name === 'OSCommerce') return false;
    return (
      !app.dataBaseServiceCode ||
      (app.dataBaseServiceCode === 'base-database-mssql' && this.mssqlQuantityAvailable > 0) ||
      (app.dataBaseServiceCode === 'base-database-mysql5' && this.mysqlQuantityAvailable > 0)
    );
  }
}

// Dialog Components
@Component({
  selector: 'app-php-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="osa-requirements-overlay">
      <div class="inner">
        <h2 mat-dialog-title>PHP Version Warning</h2>
        <mat-dialog-content>
          <div class="group">
            <div class="group-title">This hosting package is currently configured for:</div>
            <div><span class="label">PHP:</span>{{ data.currentPHPVersion }}</div>
          </div>
          <div class="group">
            <div class="group-title">This application ({{ data.appName }}) supports:</div>
            <div><span class="label">PHP:</span>{{ data.requiredPHPVersions }}</div>
          </div>
          <div>
            Before installing this application, update the PHP version from the
            <a routerLink="/php-manager">PHP Manager</a>.
          </div>
        </mat-dialog-content>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Close</button>
        </mat-dialog-actions>
      </div>
    </div>
  `,
  styles: [
    `
      .osa-requirements-overlay {
        padding: 20px;
      }
      .inner {
        background: #fff;
        border-radius: 4px;
      }
      .group {
        margin-bottom: 15px;
      }
      .group-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .label {
        font-weight: bold;
        margin-right: 5px;
      }
      a {
        color: #00bcd4;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `
  ]
})
export class PHPWarningDialogComponent {
  constructor(public dialogRef: MatDialogRef<PHPWarningDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-iis-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="osa-requirements-overlay">
      <div class="inner">
        <h2 mat-dialog-title>IIS Settings Warning</h2>
        <mat-dialog-content>
          <div class="group">
            <div class="group-title">Your IIS Application Pool is currently running:</div>
            <div><span class="label">.NET Framework:</span>{{ data.currentRuntimeVersion }}</div>
            <div><span class="label">Pipeline Mode:</span>{{ data.currentPipelineMode }}</div>
          </div>
          <div class="group">
            <div class="group-title">This application requires:</div>
            <div><span class="label">.NET Framework:</span>{{ data.requiredRuntimeVersion }}</div>
            <div><span class="label">Pipeline Mode:</span>{{ data.requiredPipelineMode }}</div>
          </div>
          <div>
            Please make changes from the
            <a routerLink="/iis-settings">IIS Settings</a> page before attempting to install this application.
          </div>
        </mat-dialog-content>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Close</button>
        </mat-dialog-actions>
      </div>
    </div>
  `,
  styles: [
    `
      .osa-requirements-overlay {
        padding: 20px;
      }
      .inner {
        background: #fff;
        border-radius: 4px;
      }
      .group {
        margin-bottom: 15px;
      }
      .group-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .label {
        font-weight: bold;
        margin-right: 5px;
      }
      a {
        color: #00bcd4;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `
  ]
})
export class IISWarningDialogComponent {
  constructor(public dialogRef: MatDialogRef<IISWarningDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}