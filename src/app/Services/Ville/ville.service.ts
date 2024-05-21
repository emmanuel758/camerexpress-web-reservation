import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville } from 'src/app/Models/ville.interface';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(
    private _appService: AppService,
    private _httClient: HttpClient
  ) { }

  getAll(): Observable<Ville[]> {
    let url = '/api/ville/get';
    return this._httClient.get<Ville[]>(this._appService.baseUrl + url);
  }
}
