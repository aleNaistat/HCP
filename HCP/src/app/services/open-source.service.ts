import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenSourceService {
  constructor(private http: HttpClient) {}

  getAppGroups(): Observable<any> {
    // Mock for now; replace with real API
    return of({
      appGroups: [],
      serviceDetails: [],
      sCode: 'UNIX'
    });
    // return this.http.get('/osapps/listinstalled');
  }

  getAwstatsStatus(): Observable<any> {
    return this.http.get('/awstats/status');
  }

  performOperation(appId: string, appType: string, operation: string, version?: string): Observable<any> {
    const params = { app: appType, appId, operation, version: version || '' };
    return this.http.get('/osapps/openexistingwizard', { params });
  }

  getPhpMyAdminUrl(dbId: string): Observable<string> {
    return this.http.get(`/mysqldbmgr/getPhpMyAdminURL?mysqlId=${dbId}`, { responseType: 'text' });
  }
}