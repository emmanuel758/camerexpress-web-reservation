import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  host = 'monorail.proxy.rlwy.net';
  port = '46323';
  baseUrl = `http://${this.host}:${this.port}`; 
}
