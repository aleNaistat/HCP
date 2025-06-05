import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface AppGroup {
  name: string;
  category: string;
  dataBaseServiceCode: string;
  openSourceApps: OpenSourceApp[];
}

interface OpenSourceApp {
  appId: string;
  appType: string;
  domainPath: string;
  httpPath: string;
  dateInstalled: string;
  lastUpgradeDate: string;
  statusCode: string;
  loginPageLink: string;
  resetPasswdLink: string;
  helpLink: string;
  dbId: string;
  dbIp: string;
  defaultPage: boolean;
  version: string;
}

interface ServiceDetail {
  serviceCode: string;
  activeQuantity: number;
  limit: number;
  percentageUsed: number;
}

interface AppGroupsResponse {
  appGroups: AppGroup[];
  serviceDetails: ServiceDetail[];
  sCode: string;
}

interface PhpVersionResponse {
  requiredPHPVersions: string;
  PHPVersionCompatible: boolean;
  currentPHPVersion: string;
}

interface IISSettingsResponse {
  runtimeVersion: string;
  pipelineMode: string;
}

interface CategorizedAppsResponse {
  categorizedApps: any[];
  serviceDetails: ServiceDetail[];
  sCode: string;
}

@Injectable({ providedIn: 'root' })
export class OpenSourceService {
  constructor(private http: HttpClient) {}

  getAppGroups(): Observable<AppGroupsResponse> {
    return of({ appGroups: [], serviceDetails: [], sCode: 'UNIX' }); // Mock
    // return this.http.get<AppGroupsResponse>('/osapps/listinstalled');
  }

  getCategorizedApps(): Observable<CategorizedAppsResponse> {
    return of({ categorizedApps: [], serviceDetails: [], sCode: 'UNIX' }); // Mock
    // return this.http.get<CategorizedAppsResponse>('/osapps/list');
  }

  getAwstatsStatus(): Observable<{ status: string; message?: string }> {
    return this.http.get<{ status: string; message?: string }>('/awstats/status');
  }

  performOperation(appId: string, appType: string, operation: string, version?: string): Observable<unknown> {
    let params = new HttpParams()
      .set('app', appType)
      .set('appId', appId)
      .set('operation', operation);
    if (version) {
      params = params.set('version', version);
    }
    return this.http.get('/osapps/openexistingwizard', { params });
  }

  getPhpMyAdminUrl(dbId: string): Observable<string> {
    return this.http.get(`/mysqldbmgr/getPhpMyAdminURL?mysqlId=${dbId}`, { responseType: 'text' });
  }

  checkPHPVersion(appName: string, version: string = ''): Observable<PhpVersionResponse> {
    const params = new HttpParams().set('app', appName).set('version', version);
    return this.http.get<PhpVersionResponse>('/osapps/osaPHPVersion', { params });
  }

  checkIISSettings(): Observable<IISSettingsResponse> {
    return this.http.get<IISSettingsResponse>('/osapps/iisAppPoolSettings');
  }
}