import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import { OpenSourceService } from '../open-source.service';

@Component({
  selector: 'app-ctb-enhancements',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './ctb-enhancements.component.html',
  styleUrls: ['./ctb-enhancements.component.scss']
})
export class CtbEnhancementsComponent implements OnInit {
  enhancementsForm = new FormGroup({
    dvssl: new FormControl(true), // Xpress SSL, checked by default
    mytime: new FormControl(true) // MyTime Support, checked by default
    // tap: new FormControl(true) // Take-a-Payment, commented out per JSP
  });
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CtbEnhancementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accountId: string; adTrackingBannerId: string; source: string },
    private snackBar: MatSnackBar,
    //private openSourceService: OpenSourceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  submitEnhancements(): void {
    if (!this.enhancementsForm.value.dvssl && !this.enhancementsForm.value.mytime) {
      this.errorMessage = 'Please select at least one enhancement to continue';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const requestData = {
      clickToBuyReq: []
    };

    if (this.enhancementsForm.value.dvssl) {
      requestData.clickToBuyReq.push({
        productCode: 'SSL_DV_MONTHLY',
        purchaseTerm: '1',
        quantity: '1',
        purchaseTermUnit: 'TWENTYEIGHTDAY',
        adTrackingBannerId: this.data.adTrackingBannerId,
        coupon: 'SSLFTPUPSELL'
      });
    }

    if (this.enhancementsForm.value.mytime) {
      requestData.clickToBuyReq.push({
        productCode: 'MYTIME_SUPPORT',
        purchaseTerm: '1',
        quantity: '1',
        purchaseTermUnit: 'MONTH',
        minutes: '30',
        adTrackingBannerId: this.data.adTrackingBannerId,
        coupon: 'BCMKT00780'
      });
    }

    const payload = {
      'default-method': 'purchaseNow',
      data: JSON.stringify(requestData),
      accountId: this.data.accountId,
      source: this.data.source
    };

    // this.openSourceService.submitCtbPurchase(payload).subscribe({
    //   next: (response: any) => {
    //     this.isLoading = false;
    //     if (response.result === 'success') {
    //       this.dialogRef.close();
    //       this.dialog.open(CtbConfirmationDialogComponent, {
    //         width: '745px',
    //         data: this.data
    //       });
    //     } else {
    //       this.errorMessage = response.errorMsg || 'A system error occurred.';
    //     }
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //     this.errorMessage = 'An unknown error occurred.';
    //   }
    // });
  }
}

@Component({
  selector: 'app-ctb-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="ctb-window">
      <div class="winmiddle">
        <div class="winbody corners-blue">
          <div class="ctb-content">
            <p class="heading">
              <img src="/assets/images/check-pw-enhancements.gif" style="vertical-align: middle;" alt="Check" />
              Congratulations!
            </p>
            <p class="result">
              Your FTP account was successfully modified. There is up to a 10 minute processing delay before changes are applied.
            </p>
            <mat-dialog-actions align="center">
              <button mat-button color="primary" mat-dialog-close>Close</button>
            </mat-dialog-actions>
          </div>
          <div class="loading-ani" *ngIf="isLoading">
            <div class="ani-content">
              <img src="/assets/images/loader.gif" class="loader" alt="Loading" />
              <div>Processing...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ctb-window {
        width: 745px;
        text-align: center;
      }
      .winmiddle {
        min-height: 351px;
      }
      .winbody {
        min-height: 141px;
        padding: 85px 0;
        background: #fff;
        border-radius: 4px;
      }
      .heading {
        font-size: 30px;
        font-weight: bold;
        color: #636363;
        margin: 20px 0 0;
      }
      .result {
        font-size: 24px;
        color: #737373;
        margin: 6px 0 26px;
      }
      .loading-ani {
        display: none;
      }
    `
  ]
})
export class CtbConfirmationDialogComponent {
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CtbConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}