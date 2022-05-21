import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  baseUrl: string = `${environment.apiBaseUrl}`;
  constructor(
    private http: HttpClient
  ) { }

  getDriverStandings(season){
    return this.http.get<any>(`${this.baseUrl}/${season}/driverStandings.json?limit=400&offset=0`, {responseType: 'json'})
  }
}
