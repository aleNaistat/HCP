import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { OpenSourceService } from '../../services/open-source.service';

interface Domain {
  domainHostname: string;
}

interface WizardForm {
  // Define based on /osapps/wizard response
  fields: any[];
}

@Component({
  selector: 'app-open-source-wizard',
  templateUrl: './open-source-wizard.component.html',
  styleUrls: ['./open-source-wizard.component.scss']
})
export class OpenSourceWizardComponent implements OnInit {
  wizardForm: FormGroup;
  domains: Domain[] = [];
  changeAppPoolSettings = false;
  appPoolStatusMessage: string | null = null;
  application: string;
  appCategory: string;
  operation: string;
  accountId: string;
  showListLink: string;
  appId: string;
  pipeline: string;
  netversion: string;
  isLoading = true;

  private apiBaseUrl = '/osapps';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private openSourceAppService: OpenSourceService
  ) {
    this.wizardForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.application = params['app'] || '';
      this.appCategory = params['app_category'] || '';
      this.operation = params['operation'] || '';
      this.accountId = params['accountId'] || '';
      this.showListLink = params['showListLink'] || '';
      this.appId = params['appId'] || '';
      this.pipeline = params['pipeline'] || '';
      this.netversion = params['netversion'] || '';
      this.changeAppPoolSettings = !!params['pipeline'] && !!params['netversion'];

      console.log('Wizard params:', params);

      this.loadDomains();
      this.loadWizardForm();
    });
  }

loadDomains(): void {
    this.openSourceAppService.getDomains().pipe(
      delay(4000), 
      catchError(() => of([]))
    ).subscribe(domains => {
      this.domains = domains;
      console.log('Loaded domains:', domains);
      if (this.wizardForm.get('BLOG_DOMAIN')) {
        this.wizardForm.get('BLOG_DOMAIN')?.setValue(domains[0]?.domainHostname || '');
      }
      this.isLoading = false;
    });
  }

  loadWizardForm(): void {
    const params = {
      application: this.application,
      file: this.operation,
      appId: this.appId,
      accountId: this.accountId,
      showListLink: this.showListLink
    };
    this.openSourceAppService.getWizardForm(params).subscribe(
      (formConfig: WizardForm) => {
        const controls = {};
        formConfig.fields.forEach(field => {
          controls[field.name] = [field.defaultValue || '', field.validators || []];
        });
        this.wizardForm = this.fb.group(controls);
        console.log('Wizard form loaded:', this.wizardForm.value);
        this.isLoading = false;
      },
      error => {
        console.error('Failed to load wizard form:', error);
        this.isLoading = false;
      }
    );
  }

changeAppPoolSettingsFn(): void {
    this.openSourceAppService.changeAppPoolSettings(this.pipeline, this.netversion).subscribe(
      response => {
        if (response === 'Done') {
          this.appPoolStatusMessage = 'The modification of the Net Framework and the Pipeline Mode is already done.';
          this.changeAppPoolSettings = false;
        } else {
          this.appPoolStatusMessage = 'Error. Occurred an error when trying to change the App Pool Settings.';
        }
      },
      error => {
        console.error('Change settings error:', error);
        this.appPoolStatusMessage = 'Error. Occurred an error when trying to change the App Pool Settings.';
      }
    );
  }

  submitWizard(): void {
    if (this.wizardForm.valid) {
      const payload = {
        ...this.wizardForm.value,
        application: this.application,
        app_category: this.appCategory,
        operation: this.operation,
        accountId: this.accountId,
        showListLink: this.showListLink
      };
      this.openSourceAppService.getSynchronizerToken().subscribe(token => {
        payload['_synchronizerToken'] = token;
        this.openSourceAppService.submitWizard(payload).subscribe(
          response => {
            console.log('Wizard submitted:', response);
            // Navigate to list or show success
          },
          error => {
            console.error('Submit wizard error:', error);
          }
        );
      });
    }
  }

  private getSynchronizerToken(): string {
    // Replace JSP ${sessionScope._synchronizerToken} with service
    return 'dummy-token'; // Implement actual token retrieval
  }
}