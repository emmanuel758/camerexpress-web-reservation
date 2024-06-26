import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/Models/Response.interface';
import { Voyage } from 'src/app/Models/voyage.interface';
import { Site } from 'src/app/Models/site.interface';
import { Ville } from 'src/app/Models/ville.interface';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) {
  }

  /**
   * Voyage list
   */
  voyages: Voyage[] = [];

  /**
   * Voyage filter list
   */
  voyagesFilter: Voyage[] = [];

  // Filter variables
  villeDepart: Ville = new Ville();
  villeDestination: Ville = new Ville();
  dateDepart: Date | null = null;
  site: Site = new Site();
  // liste des sites en fonction de la ville de depart
  sites: Site[] = [];
  classe: string | null = null;
  // prix de reservation
  min_prix_limit = 500;
  min_prix = 500;
  max_prix_limite = 10000;
  max_prix = 10000;

  // heure de depart
  min_heure_limit = 0;
  min_heure = 0;
  max_heure_limit = 1410;
  max_heure = 1410;

  /**
   * Get voyage request
   * @param villeDepart 
   * @param villeDestination 
   * @param dateDepart 
   * @param site 
   * @returns 
   */
  getVoyages(villeDepart: number, villeDestination: number): Observable<Response> {
    let url = "/api/voyage/get";
    return this._http.get<Response>(this._appService.baseUrl + url, {
      params: {
        de: villeDepart,
        vers: villeDestination,
      }
    });
  }
}
