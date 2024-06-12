import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  host = 'monorail.proxy.rlwy.net';
  port = '46323';
  // camerexpress-bookservice-production.up.railway.app
  // baseUrl = `http://${this.host}:${this.port}`; 
  baseUrl = `https://camerexpress-bookservice-production.up.railway.app`; 
}
