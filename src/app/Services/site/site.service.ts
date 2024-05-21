import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Site } from 'src/app/Models/site.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private _appService: AppService,
    private _httClient: HttpClient
  ) { }

  getAll(ville: number): Observable<Site[]> {
    let url = '/api/site/get';
    return this._httClient.get<Site[]>(this._appService.baseUrl + url, {
      params: {
        ville: ville
      }
    });
  }
}
