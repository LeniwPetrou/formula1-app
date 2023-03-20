import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  baseUrl: string = `${environment.apiBaseUrl}`;

  public items: any;
  constructor(
    private http: HttpClient
  ) { }

  getDriverStandings(pageSize: number, pageIndex: number, season){
    return this.http.get<any>(`${this.baseUrl}/${season}/driverStandings.json?limit=${pageSize}&offset=${pageIndex * 10}`, {responseType: 'json'})
  }
}
